import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getPayload } from 'payload';
import config from '@payload-config';
import { stripe, PRICE_TO_PLAN_MAP, mapStripeStatus } from '@/lib/stripe';
import { sendMembershipNotification } from '@/utilities/sendMembershipNotification';

/**
 * Webhook do Stripe para sincronizar assinaturas
 * IMPORTANTE: Este endpoint deve ser configurado no Stripe Dashboard
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Assinatura do webhook ausente' },
      { status: 400 },
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET não configurado');
    return NextResponse.json(
      { error: 'Webhook não configurado' },
      { status: 500 },
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar assinatura do webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Erro ao verificar assinatura do webhook:', errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  const payload = await getPayload({ config });

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, payload);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription, payload);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription, payload);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice, payload);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice, payload);
        break;
      }

      case 'invoice.finalized': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoiceFinalized(invoice, payload);
        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao processar webhook';
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * Processa conclusão do checkout
 */
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const userId = session.metadata?.userId;

  if (!userId) {
    console.error('userId não encontrado nos metadados do checkout');
    return;
  }

  // Verificar se é pagamento único (one-time payment)
  if (session.mode === 'payment') {
    // Processar pagamento único de membership
    const membershipExpirationDate = session.metadata?.membershipExpirationDate;
    const donationAmount = session.metadata?.donationAmount;
    
    if (!membershipExpirationDate) {
      console.error('membershipExpirationDate não encontrado nos metadados');
      return;
    }

    // Get the invoice ID if available
    let invoiceId: string | null = null;
    let invoiceUrl: string | null = null;
    
    if (session.invoice) {
      const invoice = await stripe.invoices.retrieve(session.invoice as string);
      invoiceId = invoice.id;
      invoiceUrl = invoice.hosted_invoice_url;
    }

    // Update user membership
    const updatedUser = await payload.update({
      collection: 'users',
      id: userId,
      data: {
        subscriptionPlan: 'premium',
        subscriptionStatus: 'active',
        subscriptionCurrentPeriodEnd: membershipExpirationDate,
        stripeCustomerId: session.customer as string,
        ...(invoiceId && { stripeInvoiceId: invoiceId }),
        ...(invoiceUrl && { stripeInvoiceUrl: invoiceUrl }),
      },
    });

    console.log(`Membership ativada para usuário ${userId} até ${membershipExpirationDate}`);

    // Send notification email to admin
    try {
      const userName = `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim() || 'Unknown User';
      const userEmail = updatedUser.email || 'no-email@example.com';
      const amount = donationAmount ? parseFloat(donationAmount) : 0;

      await sendMembershipNotification({
        userId,
        userName,
        userEmail,
        amount,
        currency: 'EUR',
        invoiceId: invoiceId || undefined,
        invoiceUrl: invoiceUrl || undefined,
        membershipEndDate: membershipExpirationDate,
      });
    } catch (emailError) {
      console.error('Failed to send membership notification email:', emailError);
      // Don't fail the webhook if email fails
    }
  }
  // Buscar subscription se houver (para compatibilidade com o modelo antigo)
  else if (session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );
    await updateUserSubscription(userId, subscription, payload);
  }
}

/**
 * Atualiza subscription do usuário
 */
async function handleSubscriptionUpdate(
  subscription: Stripe.Subscription,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    // Tentar buscar por stripeCustomerId
    const user = await findUserByStripeCustomerId(
      subscription.customer as string,
      payload,
    );
    if (user) {
      await updateUserSubscription(String(user.id), subscription, payload);
    }
    return;
  }

  await updateUserSubscription(userId, subscription, payload);
}

/**
 * Processa cancelamento de subscription
 */
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const userId = subscription.metadata?.userId;

  if (!userId) {
    const user = await findUserByStripeCustomerId(
      subscription.customer as string,
      payload,
    );
    if (user) {
      await cancelUserSubscription(String(user.id), payload);
    }
    return;
  }

  await cancelUserSubscription(userId, payload);
}

/**
 * Processa falha no pagamento
 */
async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  // Tentar extrair userId dos metadados da subscription
  const userId = (
    invoice as unknown as {
      subscription_details?: { metadata?: { userId?: string } };
    }
  ).subscription_details?.metadata?.userId;

  if (!userId) {
    const user = await findUserByStripeCustomerId(
      invoice.customer as string,
      payload,
    );
    if (!user) return;

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        subscriptionStatus: 'past_due',
      },
    });
    return;
  }

  await payload.update({
    collection: 'users',
    id: userId,
    data: {
      subscriptionStatus: 'past_due',
    },
  });

  console.log(`Pagamento falhou para usuário ${userId}`);
}

/**
 * Processa sucesso no pagamento
 */
async function handlePaymentSucceeded(
  invoice: Stripe.Invoice,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  // Buscar subscription e atualizar
  const invoiceData = invoice as unknown as {
    subscription?: string | { id: string };
  };
  const subscriptionId =
    typeof invoiceData.subscription === 'string'
      ? invoiceData.subscription
      : invoiceData.subscription?.id;

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const userId = subscription.metadata?.userId;
    if (userId) {
      await updateUserSubscription(userId, subscription, payload);
    }
  }
}

/**
 * Atualiza dados de subscription do usuário no Payload
 */
async function updateUserSubscription(
  userId: string,
  subscription: Stripe.Subscription,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const priceId = subscription.items.data[0]?.price.id;
  const plan = PRICE_TO_PLAN_MAP[priceId] || 'free';
  const status = mapStripeStatus(subscription.status);

  // O current_period_end está dentro do subscription item, não na subscription raiz
  const firstItem = subscription.items.data[0] as Stripe.SubscriptionItem & {
    current_period_end?: number;
  };
  const currentPeriodEndTimestamp = firstItem?.current_period_end;

  // Debug: verificar o valor
  console.log('DEBUG - current_period_end:', currentPeriodEndTimestamp);

  const currentPeriodEnd = currentPeriodEndTimestamp
    ? new Date(currentPeriodEndTimestamp * 1000).toISOString()
    : null;

  console.log('DEBUG - currentPeriodEnd ISO:', currentPeriodEnd);

  const updateData = {
    stripeCustomerId: subscription.customer as string,
    stripeSubscriptionId: subscription.id,
    subscriptionPlan: plan,
    subscriptionStatus: status,
    subscriptionCurrentPeriodEnd: currentPeriodEnd,
  };

  console.log('DEBUG - updateData:', JSON.stringify(updateData, null, 2));

  await payload.update({
    collection: 'users',
    id: userId,
    data: updateData,
  });

  console.log(
    `Subscription atualizada para usuário ${userId}: ${plan} - ${status} - Expira em: ${currentPeriodEnd}`,
  );
}

/**
 * Cancela subscription do usuário
 */
async function cancelUserSubscription(
  userId: string,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  await payload.update({
    collection: 'users',
    id: userId,
    data: {
      subscriptionPlan: 'free',
      subscriptionStatus: 'canceled',
      stripeSubscriptionId: null,
    },
  });

  console.log(`Subscription cancelada para usuário ${userId}`);
}

/**
 * Busca usuário por Stripe Customer ID
 */
async function findUserByStripeCustomerId(
  customerId: string,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const result = await payload.find({
    collection: 'users',
    where: {
      stripeCustomerId: {
        equals: customerId,
      },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Handles invoice finalization - stores invoice information
 */
async function handleInvoiceFinalized(
  invoice: Stripe.Invoice,
  payload: Awaited<ReturnType<typeof getPayload>>,
) {
  const userId = invoice.metadata?.userId;

  if (!userId) {
    // Try to find user by customer ID
    const user = await findUserByStripeCustomerId(
      invoice.customer as string,
      payload,
    );
    
    if (!user) {
      console.error('User not found for invoice:', invoice.id);
      return;
    }

    // Update user with invoice information
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        stripeInvoiceId: invoice.id,
        stripeInvoiceUrl: invoice.hosted_invoice_url || null,
      },
    });

    console.log(`Invoice ${invoice.id} stored for user ${user.id}`);
    return;
  }

  // Update user with invoice information
  await payload.update({
    collection: 'users',
    id: userId,
    data: {
      stripeInvoiceId: invoice.id,
      stripeInvoiceUrl: invoice.hosted_invoice_url || null,
    },
  });

  console.log(`Invoice ${invoice.id} stored for user ${userId}`);
}

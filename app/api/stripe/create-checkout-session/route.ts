import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { stripe, getOrCreateStripeCustomer, STRIPE_PRICES } from '@/lib/stripe';
import { getServerSideURL } from '@/utilities/getURL';

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    // Verificar autenticação via Payload
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json(
        { error: 'You need to be logged in to subscribe' },
        { status: 401 },
      );
    }

    // Verificar se já tem membership ativa
    if (user.subscriptionStatus === 'active') {
      return NextResponse.json(
        {
          error: 'You already have an active membership',
        },
        { status: 400 },
      );
    }

    // Verificar se o usuário tem donationAmount definido
    if (!user.donationAmount || user.donationAmount < 2) {
      return NextResponse.json(
        { error: 'Invalid donation amount. Minimum is €2.00' },
        { status: 400 },
      );
    }

    // Calcular data de expiração (31 de dezembro do ano atual)
    const currentYear = new Date().getFullYear();
    const expirationDate = new Date(currentYear, 11, 31, 23, 59, 59); // 31/12/YYYY às 23:59:59

    // Criar ou recuperar customer no Stripe
    const customerId = user.stripeCustomerId
      ? user.stripeCustomerId
      : await getOrCreateStripeCustomer({
          email: user.email,
          userId: user.id.toString(),
          name:
            user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : undefined,
        });

    // Se criamos um novo customer, salvar no banco
    if (!user.stripeCustomerId) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          stripeCustomerId: customerId,
        },
      });
    }

    const baseUrl = getServerSideURL();

    // Converter donationAmount para centavos (Stripe usa centavos)
    const amountInCents = Math.round(user.donationAmount * 100);

    // Criar sessão de checkout com pagamento único
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment', // One-time payment
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: amountInCents,
            product_data: {
              name: 'AIBE Membership',
              description: `Annual membership valid until December 31, ${currentYear}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/account?success=${encodeURIComponent('Membership activated successfully! Welcome to AIBE.')}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/account?canceled=true&message=${encodeURIComponent('Payment was canceled. You can try again when ready.')}`,
      metadata: {
        userId: user.id.toString(),
        membershipExpirationDate: expirationDate.toISOString(),
        donationAmount: user.donationAmount.toString(),
      },
      // Permitir códigos promocionais
      allow_promotion_codes: false,
      // Coletar endereço de cobrança
      // billing_address_collection: 'required',
      // Invoice settings - automatically send invoice email
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `AIBE Annual Membership ${currentYear}`,
          metadata: {
            userId: user.id.toString(),
            membershipYear: currentYear.toString(),
          },
          footer:
            'Thank you for joining AIBE - Italian-Brazilian Economics Association',
          // Send copy to AIBE admin email
          custom_fields: [
            {
              name: 'Organization',
              value: 'Italian-Brazilian Economics Association (AIBE)',
            },
          ],
        },
      },
      // Note: CC emails are configured in Stripe Dashboard under Settings → Emails
      // Additional recipient: aibe@aibe.website
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao processar solicitação';
    console.error('Erro ao criar checkout session:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

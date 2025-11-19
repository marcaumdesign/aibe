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
        { error: 'Você precisa estar logado para assinar' },
        { status: 401 },
      );
    }

    // Parse do body
    const body = await req.json();
    const { priceId } = body;

    // Validar priceId
    if (!priceId || !Object.values(STRIPE_PRICES).includes(priceId)) {
      return NextResponse.json(
        { error: 'Plano inválido selecionado' },
        { status: 400 },
      );
    }

    // Verificar se já tem assinatura ativa
    if (
      user.subscriptionStatus === 'active' ||
      user.subscriptionStatus === 'trialing'
    ) {
      return NextResponse.json(
        {
          error:
            'Você já tem uma assinatura ativa. Use o portal de cobrança para alterá-la.',
        },
        { status: 400 },
      );
    }

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

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/account?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/membership?canceled=true`,
      metadata: {
        userId: user.id.toString(),
      },
      subscription_data: {
        metadata: {
          userId: user.id.toString(),
        },
      },
      // Permitir códigos promocionais
      allow_promotion_codes: true,
      // Coletar endereço de cobrança
      billing_address_collection: 'required',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao processar solicitação';
    console.error('Erro ao criar checkout session:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

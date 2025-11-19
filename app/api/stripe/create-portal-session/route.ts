import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { stripe } from '@/lib/stripe';
import { getServerSideURL } from '@/utilities/getURL';

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    // Verificar autenticação via Payload
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json(
        {
          error: 'Você precisa estar logado para acessar o portal de cobrança',
        },
        { status: 401 },
      );
    }

    // Verificar se tem stripeCustomerId
    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Você ainda não tem uma assinatura' },
        { status: 400 },
      );
    }

    const baseUrl = getServerSideURL();

    // Criar sessão do portal de cobrança
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrl}/account`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao processar solicitação';
    console.error('Erro ao criar portal session:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

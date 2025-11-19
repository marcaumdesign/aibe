import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

/**
 * Instância do Stripe configurada
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
  appInfo: {
    name: 'AIBE Platform',
    version: '1.0.0',
  },
});

/**
 * IDs dos preços dos planos (configurados no Stripe Dashboard)
 */
export const STRIPE_PRICES = {
  premium: process.env.STRIPE_PRICE_PREMIUM || '',
  founders: process.env.STRIPE_PRICE_FOUNDERS || '',
} as const;

/**
 * Mapeamento de price IDs para planos
 */
export const PRICE_TO_PLAN_MAP: Record<string, 'premium' | 'founders'> = {
  [STRIPE_PRICES.premium]: 'premium',
  [STRIPE_PRICES.founders]: 'founders',
};

/**
 * Informações dos planos para exibição
 */
export const PLAN_INFO = {
  free: {
    name: 'Free',
    description: 'Acesso a conteúdo público',
    price: 0,
    currency: 'BRL',
    interval: null,
    features: [
      'Acesso a posts públicos',
      'Newsletter semanal',
      'Eventos abertos',
    ],
  },
  premium: {
    name: 'Premium',
    description: 'Conteúdo exclusivo e comunidade',
    price: 29.9, // Ajuste conforme necessário
    currency: 'BRL',
    interval: 'month' as const,
    stripePriceId: STRIPE_PRICES.premium,
    features: [
      'Tudo do plano Free',
      'Acesso a todos os posts premium',
      'Workshops exclusivos',
      'Comunidade privada',
      'Networking com membros',
    ],
  },
  founders: {
    name: 'Founders',
    description: 'Experiência VIP completa',
    price: 99.9, // Ajuste conforme necessário
    currency: 'BRL',
    interval: 'month' as const,
    stripePriceId: STRIPE_PRICES.founders,
    features: [
      'Tudo do plano Premium',
      'Conteúdo exclusivo Founders',
      'Consultoria 1:1 mensal',
      'Acesso antecipado a eventos',
      'Badge especial de Founder',
      'Networking VIP',
    ],
  },
} as const;

/**
 * Cria ou recupera um cliente no Stripe
 */
export async function getOrCreateStripeCustomer(params: {
  email: string;
  userId: string;
  name?: string;
}): Promise<string> {
  const { email, userId, name } = params;

  // Verificar se já existe um cliente com este email
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0].id;
  }

  // Criar novo cliente
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId,
    },
  });

  return customer.id;
}

/**
 * Formata valor monetário para exibição
 */
export function formatPrice(amount: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Verifica se uma assinatura está ativa
 */
export function isSubscriptionActive(
  status: Stripe.Subscription.Status,
): boolean {
  return status === 'active' || status === 'trialing';
}

/**
 * Mapeia status do Stripe para nosso tipo
 */
export function mapStripeStatus(
  status: Stripe.Subscription.Status,
):
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete'
  | 'incomplete_expired'
  | 'unpaid' {
  // O tipo do Stripe já é compatível com nosso tipo
  return status as
    | 'active'
    | 'canceled'
    | 'past_due'
    | 'trialing'
    | 'incomplete'
    | 'incomplete_expired'
    | 'unpaid';
}

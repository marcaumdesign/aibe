import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

/**
 * Configured Stripe instance
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
 * Plan price IDs (configured in Stripe Dashboard)
 */
export const STRIPE_PRICES = {
  premium: process.env.STRIPE_PRICE_PREMIUM || '',
  founders: process.env.STRIPE_PRICE_FOUNDERS || '',
} as const;

/**
 * Mapping of price IDs to plans
 */
export const PRICE_TO_PLAN_MAP: Record<string, 'premium' | 'founders'> = {
  [STRIPE_PRICES.premium]: 'premium',
  [STRIPE_PRICES.founders]: 'founders',
};

/**
 * Plan information for display
 */
export const PLAN_INFO = {
  free: {
    name: 'Free',
    description: 'Access to public content',
    price: 0,
    currency: 'USD',
    interval: null,
    features: ['Access to public posts', 'Weekly newsletter', 'Open events'],
  },
  premium: {
    name: 'Premium',
    description: 'Exclusive content and community',
    price: 29.9,
    currency: 'USD',
    interval: 'month' as const,
    stripePriceId: STRIPE_PRICES.premium,
    features: [
      'Everything from Free plan',
      'Access to all premium posts',
      'Exclusive workshops',
      'Private community',
      'Networking with members',
    ],
  },
  founders: {
    name: 'Founders',
    description: 'Complete VIP experience',
    price: 99.9,
    currency: 'USD',
    interval: 'month' as const,
    stripePriceId: STRIPE_PRICES.founders,
    features: [
      'Everything from Premium plan',
      'Exclusive Founders content',
      'Monthly 1:1 consulting',
      'Early access to events',
      'Special Founder badge',
      'VIP networking',
    ],
  },
} as const;

/**
 * Creates or retrieves a Stripe customer
 */
export async function getOrCreateStripeCustomer(params: {
  email: string;
  userId: string;
  name?: string;
}): Promise<string> {
  const { email, userId, name } = params;

  // Check if a customer with this email already exists
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0].id;
  }

  // Create new customer
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
 * Formats monetary value for display
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Checks if a subscription is active
 */
export function isSubscriptionActive(
  status: Stripe.Subscription.Status,
): boolean {
  return status === 'active' || status === 'trialing';
}

/**
 * Maps Stripe status to our type
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
  // Stripe type is already compatible with our type
  return status as
    | 'active'
    | 'canceled'
    | 'past_due'
    | 'trialing'
    | 'incomplete'
    | 'incomplete_expired'
    | 'unpaid';
}

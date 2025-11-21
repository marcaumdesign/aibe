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
 * Membership price IDs (configured in Stripe Dashboard)
 */
export const STRIPE_PRICES = {
  premium: process.env.STRIPE_PRICE_PREMIUM || '',
} as const;

/**
 * Mapping of price IDs to membership types
 */
export const PRICE_TO_PLAN_MAP: Record<string, 'premium'> = {
  [STRIPE_PRICES.premium]: 'premium',
};

/**
 * Membership information for display
 */
export const PLAN_INFO = {
  free: {
    name: 'Non-member',
    description: 'Access to public resources and content',
    price: 0,
    currency: 'EUR',
    interval: null,
    features: ['Access to public posts', 'Weekly newsletter', 'Open events'],
  },
  premium: {
    name: 'Member',
    description: 'Full access to academic resources and events',
    price: 2,
    currency: 'EUR',
    interval: null,
    stripePriceId: STRIPE_PRICES.premium,
    features: [
      'Everything from Non-member',
      'Access to all member-only content',
      'Exclusive workshops',
      'Academic community access',
      'Networking with members',
      'Valid until December 31st of the current year',
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

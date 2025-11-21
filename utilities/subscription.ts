import type { User } from '../payload-types';

/**
 * Membership types
 */
export type SubscriptionPlan = 'free' | 'premium';

/**
 * Stripe subscription status
 */
export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete'
  | 'incomplete_expired'
  | 'unpaid';

/**
 * Content access levels
 */
export type AccessLevel = 'free' | 'premium';

/**
 * Extended user with subscription fields
 * (until Payload types are regenerated)
 */
// export interface User extends BaseUser {
//   subscriptionPlan?: SubscriptionPlan
//   subscriptionStatus?: SubscriptionStatus
//   stripeCustomerId?: string
//   stripeSubscriptionId?: string
//   subscriptionCurrentPeriodEnd?: string
// }

/**
 * Membership hierarchy (from lowest to highest)
 */
const PLAN_HIERARCHY: Record<SubscriptionPlan, number> = {
  free: 0,
  premium: 1,
};

/**
 * Obtém o nível de acesso atual do usuário
 * @param user - Objeto User do Payload
 * @returns O nível de acesso do usuário
 */
export function getUserAccessLevel(
  user: User | null | undefined,
): SubscriptionPlan {
  if (!user) return 'free';

  // Se o usuário tem uma assinatura ativa, usa o plano dela
  if (user.subscriptionPlan && user.subscriptionStatus === 'active') {
    return user.subscriptionPlan as SubscriptionPlan;
  }

  // Se está em trial, também tem acesso
  if (user.subscriptionPlan && user.subscriptionStatus === 'trialing') {
    return user.subscriptionPlan as SubscriptionPlan;
  }

  // Caso contrário, é free
  return 'free';
}

/**
 * Verifica se o usuário tem acesso a um determinado nível de conteúdo
 * @param user - Objeto User do Payload
 * @param requiredLevel - Nível de acesso necessário
 * @returns true se o usuário tem acesso, false caso contrário
 */
export function userHasAccess(
  user: User | null | undefined,
  requiredLevel: AccessLevel,
): boolean {
  const userLevel = getUserAccessLevel(user);
  return PLAN_HIERARCHY[userLevel] >= PLAN_HIERARCHY[requiredLevel];
}

/**
 * Verifica se um post específico pode ser acessado pelo usuário
 * @param user - Objeto User do Payload
 * @param post - Post com campo accessLevel
 * @returns true se o usuário pode acessar, false caso contrário
 */
export function canAccessPost(
  user: User | null | undefined,
  post: { accessLevel?: string | null },
): boolean {
  // Se não há nível de acesso definido, assume que é free
  const requiredLevel = (post.accessLevel || 'free') as AccessLevel;

  // Se é conteúdo free, todos podem acessar
  if (requiredLevel === 'free') return true;

  // Para conteúdo pago, verifica o nível do usuário
  return userHasAccess(user, requiredLevel);
}

/**
 * Obtém informações detalhadas sobre o status da assinatura do usuário
 * @param user - Objeto User do Payload
 * @returns Objeto com informações da assinatura
 */
export function getUserSubscriptionStatus(user: User | null | undefined): {
  plan: SubscriptionPlan;
  status: SubscriptionStatus | null;
  isActive: boolean;
  isCanceled: boolean;
  isPastDue: boolean;
  hasStripeCustomer: boolean;
  currentPeriodEnd: string | null;
} {
  if (!user) {
    return {
      plan: 'free',
      status: null,
      isActive: false,
      isCanceled: false,
      isPastDue: false,
      hasStripeCustomer: false,
      currentPeriodEnd: null,
    };
  }

  const plan = (user.subscriptionPlan as SubscriptionPlan) || 'free';
  const status = (user.subscriptionStatus as SubscriptionStatus) || null;
  const isActive = status === 'active' || status === 'trialing';
  const isCanceled = status === 'canceled';
  const isPastDue = status === 'past_due';
  const hasStripeCustomer = !!user.stripeCustomerId;
  const currentPeriodEnd = user.subscriptionCurrentPeriodEnd || null;

  return {
    plan,
    status,
    isActive,
    isCanceled,
    isPastDue,
    hasStripeCustomer,
    currentPeriodEnd,
  };
}

/**
 * Verifica se o usuário precisa fazer upgrade para acessar conteúdo
 * @param user - Objeto User do Payload
 * @param requiredLevel - Nível de acesso necessário
 * @returns true se precisa fazer upgrade, false caso contrário
 */
export function needsUpgrade(
  user: User | null | undefined,
  requiredLevel: AccessLevel,
): boolean {
  return !userHasAccess(user, requiredLevel);
}

/**
 * Obtém o próximo plano recomendado para upgrade
 * @param currentPlan - Plano atual do usuário
 * @param requiredLevel - Nível necessário para acessar o conteúdo
 * @returns O plano recomendado para upgrade
 */
export function getRecommendedPlan(
  currentPlan: SubscriptionPlan,
  requiredLevel: AccessLevel,
): SubscriptionPlan {
  // Se já tem acesso, retorna o plano atual
  if (PLAN_HIERARCHY[currentPlan] >= PLAN_HIERARCHY[requiredLevel]) {
    return currentPlan;
  }

  // Caso contrário, retorna o nível necessário
  return requiredLevel;
}

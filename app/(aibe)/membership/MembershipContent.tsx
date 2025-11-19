'use client';

import { PricingCard } from './PricingCard';
import type { User } from '@/payload-types';

interface MembershipContentProps {
  user: User | null;
  plans: Array<{
    name: string;
    description: string;
    price: number;
    currency: string;
    interval: 'month' | 'year' | null;
    features: string[];
    stripePriceId?: string;
    planId: 'free' | 'premium' | 'founders';
  }>;
}

export function MembershipContent({ user, plans }: MembershipContentProps) {
  const currentPlan = user?.subscriptionPlan || 'free';
  const isLoggedIn = !!user;

  return (
    <section className="py-16 mobile:py-12 bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-title-h2 text-black mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-paragraph-lg text-gray-600 max-w-2xl mx-auto">
            Acesse conteúdo exclusivo, workshops e uma comunidade vibrante de profissionais
            interessados em economia Brasil-Itália
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <PricingCard
              key={plan.planId}
              {...plan}
              isPopular={plan.planId === 'premium'}
              isCurrent={currentPlan === plan.planId}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        {/* Stripe Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg bg-white">
            <span className="text-gray-600 text-sm font-normal">Powered by</span>
            <span className="text-gray-900 text-sm font-bold italic">stripe</span>
          </div>
        </div>

        {/* Additional Info */}
        {user && user.stripeCustomerId && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Precisa gerenciar sua assinatura?
            </p>
            <ManageSubscriptionButton />
          </div>
        )}
      </div>
    </section>
  );
}

function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao acessar portal');
      }

      window.location.href = data.url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao acessar portal';
      console.error('Erro ao acessar portal:', errorMessage);
      alert(errorMessage || 'Erro ao acessar portal de cobrança');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      className="text-blue-600 hover:text-blue-700 underline text-sm font-medium"
    >
      {loading ? 'Carregando...' : 'Gerenciar Assinatura'}
    </button>
  );
}

import { useState } from 'react';


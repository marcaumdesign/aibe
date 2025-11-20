'use client';

import { useState } from 'react';
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
      <div className="mx-auto max-w-7xl px-8 mobile:px-4">
        {/* Header */}
        <div className="text-center mb-12 mobile:mb-8">
          <p className="text-gray-400 font-medium tracking-wider uppercase mb-4" style={{ fontSize: '12px', lineHeight: '16px' }}>
            CHOOSE YOUR PLAN
          </p>
          <h1 className="text-title-h1 text-black mb-4">
            Choose Your Plan
          </h1>
          <p className="text-paragraph-lg text-gray-600 max-w-2xl mx-auto">
            Access exclusive content, workshops, and a vibrant community of professionals interested in Brazil-Italy economics
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm">
            <span className="text-gray-600 text-sm font-normal">Powered by</span>
            <span className="text-gray-900 text-sm font-bold italic">stripe</span>
          </div>
        </div>

        {/* Additional Info */}
        {user && user.stripeCustomerId && (
          <div className="text-center bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <p className="text-paragraph-md text-gray-700 mb-4 font-medium">
              Need to manage your subscription?
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
        throw new Error(data.error || 'Error accessing portal');
      }

      window.location.href = data.url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error accessing portal';
      console.error('Error accessing portal:', errorMessage);
      alert(errorMessage || 'Error accessing billing portal');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePortal}
      disabled={loading}
      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-base text-white font-medium hover:bg-primary-base/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </button>
  );
}
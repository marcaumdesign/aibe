'use client';

import { useState } from 'react';
import { Root as Button } from '@/components/ui/button';
import { RiCheckLine, RiLoader2Line } from '@remixicon/react';
import { toast } from 'sonner';

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year' | null;
  features: string[];
  stripePriceId?: string;
  isPopular?: boolean;
  isCurrent?: boolean;
  isLoggedIn: boolean;
}

export function PricingCard({
  name,
  description,
  price,
  currency,
  interval,
  features,
  stripePriceId,
  isPopular = false,
  isCurrent = false,
  isLoggedIn,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error('Você precisa fazer login primeiro');
      window.location.href = '/sign-in?redirect=/membership';
      return;
    }

    if (!stripePriceId) {
      return; // Plano gratuito
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: stripePriceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar checkout');
      }

      // Redirecionar para o Stripe Checkout
      window.location.href = data.url;
    } catch (error: any) {
      console.error('Erro no checkout:', error);
      toast.error(error.message || 'Erro ao processar pagamento');
      setLoading(false);
    }
  };

  const formatPrice = () => {
    if (price === 0) return 'Grátis';

    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(price);

    return interval ? `${formatted}/${interval === 'month' ? 'mês' : 'ano'}` : formatted;
  };

  return (
    <div
      className={`relative flex flex-col rounded-lg border-2 bg-white p-8 ${isPopular
        ? 'border-blue-600 shadow-lg scale-105'
        : 'border-gray-200'
        }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-medium text-white">
          Mais Popular
        </div>
      )}

      {isCurrent && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-4 py-1 text-sm font-medium text-white">
          Plano Atual
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice()}
          </span>
        </div>
      </div>

      <ul className="mb-8 flex-grow space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <RiCheckLine className="h-5 w-5 flex-shrink-0 text-green-600" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={isPopular ? 'primary' : 'neutral'}
        mode={isPopular ? 'filled' : 'stroke'}
        size="medium"
        className="w-full"
        onClick={handleCheckout}
        disabled={loading || isCurrent || !stripePriceId}
      >
        {loading ? (
          <>
            <RiLoader2Line className="h-5 w-5 animate-spin" />
            Processando...
          </>
        ) : isCurrent ? (
          'Plano Atual'
        ) : stripePriceId ? (
          'Assinar Agora'
        ) : (
          'Continuar Grátis'
        )}
      </Button>

      {stripePriceId && (
        <p className="mt-4 text-center text-xs text-gray-500">
          Cancele a qualquer momento
        </p>
      )}
    </div>
  );
}


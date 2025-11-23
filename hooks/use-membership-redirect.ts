'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface UseMembershipRedirectOptions {
  isLoggedIn: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useMembershipRedirect({ isLoggedIn, onSuccess, onError }: UseMembershipRedirectOptions) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const redirectToMembership = async () => {
    // If user is not logged in, redirect to create account
    if (!isLoggedIn) {
      router.push('/create-account');
      return;
    }

    // User is logged in - redirect to Stripe checkout
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        onSuccess?.();
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process membership request';
      toast.error(errorMessage);
      onError?.(error instanceof Error ? error : new Error(errorMessage));
      setIsProcessing(false);
    }
  };

  return {
    redirectToMembership,
    isProcessing,
  };
}


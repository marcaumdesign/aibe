'use client'

import React from 'react'
import { RiLockLine, RiVipCrownLine } from '@remixicon/react'
import Link from 'next/link'

import { Root as Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useMembershipRedirect } from '@/hooks/use-membership-redirect'

import type { AccessLevel } from '@/utilities/subscription'

interface PaywallBannerProps {
  requiredLevel: AccessLevel
  isLoggedIn: boolean
  previewContent?: string | React.ReactNode
}

const PLAN_INFO: Record<AccessLevel, { title: string; icon: React.ReactNode; color: string }> = {
  free: {
    title: 'Public',
    icon: <RiLockLine className="h-5 w-5" />,
    color: 'text-gray-600',
  },
  premium: {
    title: 'Member',
    icon: <RiVipCrownLine className="h-5 w-5" />,
    color: 'text-amber-600',
  },
}

export function PaywallBanner({ requiredLevel, isLoggedIn, previewContent }: PaywallBannerProps) {
  const planInfo = PLAN_INFO[requiredLevel]
  const { redirectToMembership, isProcessing } = useMembershipRedirect({ isLoggedIn })

  return (
    <div className="relative my-8">
      {/* Preview Content com Fade */}
      {previewContent && (
        <div className="relative mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {typeof previewContent === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: previewContent }} />
            ) : (
              previewContent
            )}
          </div>
          {/* Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>
      )}

      {/* Paywall Banner */}
      <Card className="border-2 border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          {/* Icon */}
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 ${planInfo.color}`}
          >
            {planInfo.icon}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">{planInfo.title} Content</h3>
            <p className="text-muted-foreground">
              {isLoggedIn
                ? `This content is available for ${planInfo.title} members only.`
                : `Sign in or become a ${planInfo.title} to continue reading.`}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {!isLoggedIn && (
              <>
                <Button asChild size="medium" variant="primary">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="medium" variant="neutral" mode="stroke">
                  <Link href="/create-account">Create Account</Link>
                </Button>
              </>
            )}

            {isLoggedIn && (
              <Button 
                size="medium" 
                variant="primary"
                onClick={redirectToMembership}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Become a Member'}
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-sm text-muted-foreground">
            <p>
              Unlimited access to exclusive content, community and more.{' '}
              <Link href="/membership" className="underline hover:text-foreground">
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}


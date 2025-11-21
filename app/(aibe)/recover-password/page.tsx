import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '../../../payload.config'
import { RecoverPasswordForm } from './RecoverPasswordForm'
import { Badge } from '@/components/ui/badge'

export default async function RecoverPassword() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?message=${encodeURIComponent('Cannot recover password while logged in.')}`)
  }

  return (
    <div className="bg-white">
      <section className="pt-16 pb-8 px-8 mobile:pt-8 mobile:pb-4 mobile:px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4 items-start">
            {/* Left side - Content */}
            <div className="space-y-3">
              <div className="space-y-10">
                <Badge variant='with-dot' size='medium'>
                  RESET PASSWORD
                </Badge>
                <h1 className="text-primary-base text-title-h1">
                  Recover Your Account
                </h1>
              </div>
              <p className="text-text-sub-600 text-paragraph-md max-w-md">
                Enter your email address and we&apos;ll send you instructions on how to reset your password securely.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h6 className="text-primary-base text-title-h6 mb-1">Secure Process</h6>
                    <p className="text-paragraph-sm text-text-sub-600">We&apos;ll send a secure link to your email address.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h6 className="text-primary-base text-title-h6 mb-1">Quick Recovery</h6>
                    <p className="text-paragraph-sm text-text-sub-600">Reset your password in just a few minutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h6 className="text-primary-base text-title-h6 mb-1">Stay Protected</h6>
                    <p className="text-paragraph-sm text-text-sub-600">Your account security is our priority.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Recovery Form */}
            <div className="w-full max-w-md">
              <RecoverPasswordForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

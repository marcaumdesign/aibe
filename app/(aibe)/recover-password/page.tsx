import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '../../../payload.config'
import { RecoverPasswordForm } from './RecoverPasswordForm'

export default async function RecoverPassword() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?message=${encodeURIComponent('Cannot recover password while logged in.')}`)
  }

  return (
    <div className="bg-white">
      <section className="py-16 px-8 mobile:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-12 items-start">
            {/* Left side - Content */}
            <div className="space-y-3">
              <div className="space-y-10">
                <p className="text-gray-400 font-medium tracking-wider uppercase pl-2" style={{ fontSize: '12px', lineHeight: '16px' }}>
                  RESET PASSWORD
                </p>
                <h1 className="text-title-h1 text-black">
                  Recover Your Account
                </h1>
              </div>
              <p className="text-gray-700 text-base leading-relaxed max-w-md">
                Enter your email address and we&apos;ll send you instructions on how to reset your password securely.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Secure Process</h3>
                    <p className="text-paragraph-sm text-text-sub-600">We&apos;ll send a secure link to your email address.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Quick Recovery</h3>
                    <p className="text-paragraph-sm text-text-sub-600">Reset your password in just a few minutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Stay Protected</h3>
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

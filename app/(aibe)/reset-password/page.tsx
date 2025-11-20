import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '../../../payload.config'
import { ResetPasswordForm } from './ResetPasswordForm'

export default async function ResetPassword() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?message=${encodeURIComponent('Cannot reset password while logged in.')}`)
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
                  SECURE ACCESS
                </p>
                <h1 className="text-title-h1 text-black">
                  Set New Password
                </h1>
              </div>
              <p className="text-gray-700 text-base leading-relaxed max-w-md">
                Please enter your new password below. Make sure it&apos;s strong and secure to protect your account.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Strong Password</h3>
                    <p className="text-paragraph-sm text-text-sub-600">Use at least 8 characters with a mix of letters and numbers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Account Security</h3>
                    <p className="text-paragraph-sm text-text-sub-600">Your password is encrypted and never stored in plain text.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Instant Access</h3>
                    <p className="text-paragraph-sm text-text-sub-600">You&apos;ll be automatically signed in after resetting your password.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Reset Form */}
            <div className="w-full max-w-md">
              <ResetPasswordForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

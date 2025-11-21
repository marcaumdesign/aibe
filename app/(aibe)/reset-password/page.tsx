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
      <section className="pt-16 pb-8 px-8 mobile:pt-8 mobile:pb-4 mobile:px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4 items-start">
            {/* Left side - Content */}
            <div className="space-y-3">
              <div className="space-y-10">
                <p className="text-text-soft-400 text-subheading-xs uppercase pl-2">
                  SECURE ACCESS
                </p>
                <h1 className="text-text-strong-950 text-title-h1">
                  Set New Password
                </h1>
              </div>
              <p className="text-text-sub-600 text-paragraph-md max-w-md">
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

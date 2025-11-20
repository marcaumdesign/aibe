import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '../../../payload.config'
import { CreateAccountForm } from './CreateAccountForm'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(
      `/account?message=${encodeURIComponent(
        'Cannot create a new account while logged in, please log out and try again.',
      )}`,
    )
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
                  JOIN US
                </p>
                <h1 className="text-title-h1 text-black">
                  Become a Member!
                </h1>
              </div>
              <p className="text-gray-700 text-base leading-relaxed max-w-md">
                Join the Italian-Brazilian Association of Economists and connect with researchers, access exclusive content, and participate in our events.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Access Exclusive Content</h3>
                    <p className="text-paragraph-sm text-text-sub-600">Get access to workshops, events, and research materials.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Network with Researchers</h3>
                    <p className="text-paragraph-sm text-text-sub-600">Connect with economists from Brazil and Italy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                  <div>
                    <h3 className="text-title-h6 text-text-strong-950 mb-1">Stay Updated</h3>
                    <p className="text-paragraph-sm text-text-sub-600">Receive newsletters and event notifications.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Registration Form */}
            <div className="w-full max-w-md">
              <CreateAccountForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

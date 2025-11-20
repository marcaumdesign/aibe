import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'

import config from '../../../payload.config'
import { Root as Button } from "@/components/ui/button";
import { HydrateClientUser } from '../_components/HydrateClientUser'
import { AccountForm } from './AccountForm'

export default async function Account() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { permissions, user } = await payload.auth({ headers })

  if (!user) {
    redirect(
      `/sign-in?error=${encodeURIComponent('You must be logged in to access your account.')}&redirect=/account`,
    )
  }

  return (
    <Fragment>
      <HydrateClientUser permissions={permissions} user={user} />
      <div className="bg-white">
        <section className="py-16 px-8 mobile:px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <p className="text-gray-400 font-medium tracking-wider uppercase mb-4" style={{ fontSize: '12px', lineHeight: '16px' }}>
                YOUR PROFILE
              </p>
              <div className="flex justify-between items-center mobile:flex-col mobile:items-start mobile:gap-4">
                <div>
                  <h1 className="text-title-h1 text-black">
                    Account Settings
                  </h1>
                  <p className="text-gray-700 text-base leading-relaxed mt-2">
                    Manage your profile information and subscription plan
                  </p>
                </div>
                <Button
                  asChild
                  variant='neutral'
                  mode='stroke'
                  size='medium'
                  className='rounded-none h-12'
                >
                  <Link href='/logout'>Sign Out</Link>
                </Button>
              </div>
            </div>

            {/* Account Form */}
            <AccountForm />
          </div>
        </section>
      </div>
    </Fragment>
  )
}

import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'

import config from '../../../payload.config'
import { Root as Button } from "@/components/ui/button";
import { HydrateClientUser } from '../_components/HydrateClientUser'
import { AccountForm } from './AccountForm'
import { Badge } from '@/components/ui/badge';

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
        <section className="pt-16 pb-8 px-8 mobile:pt-8 mobile:pb-4 mobile:px-4">
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="mb-4 flex flex-col gap-4">
              <Badge variant='with-dot' size='medium'>
                YOUR PROFILE
              </Badge>
              <div className="flex justify-between items-center mobile:flex-col mobile:items-start mobile:gap-4">
                <div>
                  <h1 className="text-primary-base text-title-h1">
                    Account Settings
                  </h1>
                  <p className="text-text-sub-600 text-paragraph-md mt-2">
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

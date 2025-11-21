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
        <section className="p-8 mobile:p-4">
          <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="mb-8 mobile:mb-6 flex flex-col gap-4">
              <Badge variant='with-dot' size='medium'>
                YOUR PROFILE
              </Badge>
              <div className="flex justify-between items-start gap-4 mobile:flex-col mobile:w-full">
                <div className="flex-1">
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
                  className='rounded-none h-12 mobile:w-full'
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

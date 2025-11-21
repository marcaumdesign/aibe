import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '../../../payload.config'
import { CreateAccountForm } from './CreateAccountForm'
import { Badge } from '@/components/ui/badge'

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
      <section className="pt-16 pb-8 px-8 mobile:pt-8 mobile:pb-4 mobile:px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8 justify-start items-start">
            {/* Left side - Content */}
            <div className="flex flex-col gap-8">
              <div className="space-y-10">
                <Badge variant='with-dot' size='medium'>
                  JOIN US
                </Badge>
                <h1 className="text-text-strong-950 text-title-h1">
                  Become a Member!
                </h1>
              </div>
              <p className="text-text-sub-600 text-paragraph-md max-w-md">
                Become a member of AIBE for 1 year by making a free donation of at least 2 euros!


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

              <div className="flex justify-start mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white shadow-sm">
                  <span className="text-text-sub-600 text-paragraph-sm">Powered by</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="21" viewBox="54 36 360.02 149.84" className="inline-block">
                    <path fill="#635BFF" fillRule="evenodd" clipRule="evenodd" d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z" />
                    <path fill="#635BFF" fillRule="evenodd" clipRule="evenodd" d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z" />
                    <polygon fill="#635BFF" fillRule="evenodd" clipRule="evenodd" points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3" />
                    <rect x="223.8" y="69.3" fill="#635BFF" fillRule="evenodd" clipRule="evenodd" width="25.1" height="87.5" />
                    <path fill="#635BFF" fillRule="evenodd" clipRule="evenodd" d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z" />
                    <path fill="#635BFF" fillRule="evenodd" clipRule="evenodd" d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z" />
                    <path fill="#635BFF" fillRule="evenodd" clipRule="evenodd" d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z" />
                  </svg>
                </div>
              </div>

              <p className="text-text-sub-600 text-paragraph-xs">To register and pay, click on the link below. You will be asked to complete and submit the AIBE Membership Form. You will next be directed to a payment page. Once payment is complete, you will receive a payment confirmation email, which contains a unique Member ID and serves as proof of membership. Membership lasts until 31 December of each year.</p>



            </div>

            {/* Right side - Registration Form */}
            <div className="w-full max-w-md">
              <CreateAccountForm />

            </div>
          </div>
        </div>
      </section >
    </div >
  )
}

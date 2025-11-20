import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '../../../payload.config'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Root as Button } from "@/components/ui/button"
import { LogoutPage } from './LogoutPage'

export default async function Logout() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return (
      <div className="bg-white">
        <section className="py-16 px-8 mobile:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-12 items-start">
              {/* Left side - Content */}
              <div className="space-y-3">
                <div className="space-y-10">
                  <p className="text-gray-400 font-medium tracking-wider uppercase pl-2" style={{ fontSize: '12px', lineHeight: '16px' }}>
                    SESSION ENDED
                  </p>
                  <h1 className="text-title-h1 text-black">
                    Already Logged Out
                  </h1>
                </div>
                <p className="text-gray-700 text-base leading-relaxed max-w-md">
                  You are currently not signed in. Sign in to access your account or explore our content.
                </p>
              </div>

              {/* Right side - Card */}
              <div className="w-full max-w-md">
                <Card className="w-full shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
                      Not Signed In
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-paragraph-md text-text-sub-600">
                      You are already logged out. Would you like to sign in to your account or explore our website?
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Link href="/sign-in" className="w-full">
                      <Button
                        variant="primary"
                        size="medium"
                        className="w-full h-12 mobile:h-10 rounded-none"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/" className="w-full">
                      <Button
                        variant="neutral"
                        size="medium"
                        className="w-full h-12 mobile:h-10 rounded-none"
                      >
                        Go to Home
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return <LogoutPage />
}

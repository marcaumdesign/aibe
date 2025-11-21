'use client'

import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Root as Button } from "@/components/ui/button"
import { useAuth } from '../../_providers/Auth'
import { revalidateHeader } from '../../_actions/revalidate'

export const LogoutPage: React.FC = () => {
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        // Revalidar o header para atualizar o estado de autenticação
        await revalidateHeader()
        setSuccess('Logged out successfully.')
      } catch {
        setError('You are already logged out.')
      }
    }

    void performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div className="bg-white">
          <section className="py-16 px-8 mobile:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 mobile:grid-cols-1 gap-12 items-start">
                {/* Left side - Content */}
                <div className="space-y-3">
                  <div className="space-y-10">
                    <p className="text-gray-400 font-medium tracking-wider uppercase pl-2" style={{ fontSize: '12px', lineHeight: '16px' }}>
                      {success ? 'SIGNED OUT' : 'SESSION ENDED'}
                    </p>
                    <h1 className="text-title-h1 text-black">
                      {success ? 'You\'re Signed Out' : 'Already Logged Out'}
                    </h1>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed max-w-md">
                    {success
                      ? 'You have been successfully signed out of your account. Thank you for visiting AIBE!'
                      : 'You are currently not signed in to any account.'}
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                      <div>
                        <h3 className="text-title-h6 text-text-strong-950 mb-1">Stay Connected</h3>
                        <p className="text-paragraph-sm text-text-sub-600">Sign in again to access your account and exclusive content.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
                      <div>
                        <h3 className="text-title-h6 text-text-strong-950 mb-1">Explore AIBE</h3>
                        <p className="text-paragraph-sm text-text-sub-600">Browse our events, workshops, and research content.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Card */}
                <div className="w-full max-w-md">
                  <Card className="w-full shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
                        {success ? 'Come Back Soon!' : 'Sign In Required'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-paragraph-md text-text-sub-600 mb-4">
                        {success
                          ? 'Your session has ended successfully. You can sign in again anytime to access your account.'
                          : 'You need to be signed in to access your account features.'}
                      </p>
                      {success && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <p className="text-paragraph-sm text-green-900">
                            <strong>✓ Successfully signed out</strong>
                            <br />
                            Your account is secure and all sessions have been terminated.
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                      <Link href="/sign-in" className="w-full">
                        <Button
                          variant="primary"
                          size="medium"
                          className="w-full h-12 mobile:h-10 rounded-none"
                        >
                          Sign In Again
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
      )}
    </Fragment>
  )
}

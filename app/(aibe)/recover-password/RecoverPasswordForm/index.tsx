'use client'

import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Root as Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from '../../_components/Message'
import * as Label from '@/components/ui/label';

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <Card className="w-full shadow-lg border-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
                Recover Password
              </CardTitle>
              <CardDescription className="text-paragraph-md mobile:text-paragraph-sm text-text-sub-600">
                Enter your email address to receive password reset instructions.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 mobile:gap-4">
              {error && <Message className={''} error={error} />}
              
              <div className="grid gap-2">
                <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
                  Email Address
                </Label.Root>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  hasError={!!errors.email}
                  {...register("email", { required: true })}
                  className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-0">
              <Button
                type="submit"
                variant="primary"
                size="medium"
                className="w-full h-12 mobile:h-10 rounded-none"
              >
                Send Reset Instructions
              </Button>
              <div className="text-center text-paragraph-sm text-text-sub-600">
                Remember your password?{' '}
                <Link href="/sign-in" className="text-primary-base text-label-sm hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      )}
      {success && (
        <Card className="w-full shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
              Check Your Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-paragraph-md text-text-sub-600">
              We&apos;ve sent you an email with instructions to reset your password. Please check your inbox and follow the link provided.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-paragraph-sm text-text-sub-600">
                <strong className="text-text-strong-950">Didn&apos;t receive the email?</strong>
                <br />
                Check your spam folder or try again in a few minutes.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-0">
            <Link href="/sign-in" className="w-full">
              <Button
                variant="primary"
                size="medium"
                className="w-full h-12 mobile:h-10 rounded-none"
              >
                Back to Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </Fragment>
  )
}

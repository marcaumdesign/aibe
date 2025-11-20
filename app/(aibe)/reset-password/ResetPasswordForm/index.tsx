'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Root as Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'
import * as Label from '@/components/ui/label';

type FormData = {
  password: string
  token: string
}

export const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
        {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        },
      )

      if (response.ok) {
        const json = await response.json()

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password })

        // Redirect them to `/account` with success message in URL
        router.push('/account?success=Password reset successfully.')
      } else {
        setError('There was a problem while resetting your password. Please try again later.')
      }
    },
    [router, login],
  )

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    reset({ token: token || undefined })
  }, [reset, token])

  return (
    <Card className="w-full shadow-lg border-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
            Reset Password
          </CardTitle>
          <CardDescription className="text-paragraph-md mobile:text-paragraph-sm text-text-sub-600">
            Enter your new password to regain access to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 mobile:gap-4">
          {error && <Message className={''} error={error} />}
          
          <div className="grid gap-2">
            <Label.Root htmlFor="password" className="text-label-sm text-text-strong-950">
              New Password
            </Label.Root>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              hasError={!!errors.password}
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
          <input type="hidden" {...register('token')} />
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-paragraph-sm text-blue-900">
              <strong>Tip:</strong> Use a strong password with at least 8 characters, including letters and numbers.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-0">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full h-12 mobile:h-10 rounded-none"
          >
            Reset Password & Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'
import * as Label from "@/components/ui/label";
import { Root as Button } from "@/components/ui/button";
import { revalidateHeader } from '../../_actions/revalidate';

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        // Revalidar o header para atualizar o estado de autenticação
        await revalidateHeader()
        if (redirect?.current) { router.push(redirect.current) }
        else { router.push('/account') }
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <Card className="w-full shadow-lg border-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-6 mobile:gap-4 pt-16">
          {error && <Message className={''} error={error} />}

          <div className="grid gap-2">
            <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
              Email
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
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label.Root htmlFor="password" className="text-label-sm text-text-strong-950">
                Password
              </Label.Root>
              <Link
                href={`/recover-password${allParams}`}
                className="text-paragraph-sm text-primary-base hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              hasError={!!errors.password}
              {...register("password", { required: true })}
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
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="text-center text-paragraph-sm text-text-sub-600">
            Don&apos;t have an account?{' '}
            <Link href={`/create-account${allParams}`} className="text-primary-base text-label-sm hover:underline">
              Create account
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

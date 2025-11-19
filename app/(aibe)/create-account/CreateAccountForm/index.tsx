'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Root as Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'
import * as Label from '@/components/ui/label'
// import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) { router.push(redirect) }
        else { router.push(`/account?success=${encodeURIComponent('Account created successfully')}`) }
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form className={''} onSubmit={handleSubmit(onSubmit)}>
      <p>
        {`This is where new customers can signup and create a new account. To manage all users, `}
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
          login to the admin dashboard
        </Link>
        .
      </p>
      <Message className={''} error={error} />
      <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
        Email Address
      </Label.Root>
      <Input
        hasError={errors.email ? true : false}
        {...register("email", { required: true })}
        type="email"
      />
      <Label.Root htmlFor="password" className="text-label-sm text-text-strong-950">
        Password
      </Label.Root>
      <Input
        hasError={errors.password ? true : false}
        {...register("password", { required: true })}
        type="password"
      />
      <Label.Root htmlFor="passwordConfirm" className="text-label-sm text-text-strong-950">
        Confirm Password
      </Label.Root>
      <Input
        hasError={errors.passwordConfirm ? true : false}
        {...register("passwordConfirm", { required: true })}
        type="password"
      />
      <Button
        size="medium"
        variant="primary"
        className="w-full h-12 mobile:h-10 rounded-none"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Processing' : 'Create Account'}
      </Button>
      <div>
        {'Already have an account? '}
        <Link href={`/login${allParams}`}>Login</Link>
      </div>
    </form>
  )
}

'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

// import * as Button from '@/components/ui/button'
import { Input } from "@/components/ui/input";
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'
// import classes from './index.module.scss'
import * as Label from "@/components/ui/label";
import { Root as Button } from "@/components/ui/button";

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
  } = useForm<FormData>({
    defaultValues: {
      email: 'demo@payloadcms.com',
      password: 'demo',
    },
  })

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) { router.push(redirect.current) }
        else { router.push('/account') }
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form className={''} onSubmit={handleSubmit(onSubmit)}>
      <p>
        {'To log in, use the email '}
        <b>demo@payloadcms.com</b>
        {' with the password '}
        <b>demo</b>
        {'. To manage your users, '}
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
        required
        type="email"
      />
      <Label.Root htmlFor="password" className="text-label-sm text-text-strong-950">
        Password
      </Label.Root>
      <Input
        hasError={errors.password ? true : false}
        {...register("password", { required: true })}
        required
        type="password"
      />

      <Button
        size="medium"
        variant="primary"
        className="w-full h-12 mobile:h-10 rounded-none"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Processing' : 'Login'}
      </Button>
      <div>
        <Link href={`/create-account${allParams}`}>Create an account</Link>
        <br />
        <Link href={`/recover-password${allParams}`}>Recover your password</Link>
      </div>
    </form>
  )
}

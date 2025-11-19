'use client'

import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Root as Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from '../../_components/Message'
// import classes from './index.module.scss'
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
        <React.Fragment>
          <h1>Recover Password</h1>
          <div className={''}>
            <p>
              {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage all of your users, `}
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
                login to the admin dashboard
              </Link>
              .
            </p>
            <form className={''} onSubmit={handleSubmit(onSubmit)}>
              <Message className={''} error={error} />
              <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
                Email Address
              </Label.Root>
              <Input
                hasError={errors.email ? true : false}
                {...register("email", { required: true })}
                name="email"
                // register={register}
                required
                type="email"
              />
              <Button
                size="medium"
                variant="primary"
                className="w-full h-12 mobile:h-10 rounded-none"
                // label="Recover Password"
                type="submit"
              >
                Recover Password
              </Button>
            </form>
          </div>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1>Request submitted</h1>
          <p>Check your email for a link that will allow you to securely reset your password.</p>
        </React.Fragment>
      )}
    </Fragment>
  )
}

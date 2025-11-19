'use client'

import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Root as Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'
// import classes from './index.module.scss'
import * as Label from '@/components/ui/label';

type FormData = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

export const AccountForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)
  const router = useRouter()

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(`/login?unauthorized=account`)
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form className={''} onSubmit={handleSubmit(onSubmit)}>
      <Message className={''} error={error} success={success} />
      {!changePassword ? (
        <Fragment>
          <p>
            {'To change your password, '}
            <button
              className={''}
              onClick={() => setChangePassword(!changePassword)}
              type="button"
            >
              click here
            </button>
            .
          </p>
          <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
            Email Address
          </Label.Root>
          <Input
            hasError={errors.email ? true : false}
            {...register("email", { required: true })}
            type="email"
          />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            {'Change your password below, or '}
            <button
              className={''}
              onClick={() => setChangePassword(!changePassword)}
              type="button"
            >
              cancel
            </button>
            .
          </p>
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
          // validate={(value: string) => value === password.current || 'The passwords do not match'}
          />
        </Fragment>
      )
      }
      <Button
        size="medium"
        variant="primary"
        className="w-full h-12 mobile:h-10 rounded-none"
        // className={classes.submit}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Processing' : changePassword ? 'Change password' : 'Update account'}
      </Button>
    </form >
  )
}

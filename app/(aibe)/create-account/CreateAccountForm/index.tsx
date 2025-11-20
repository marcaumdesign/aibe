'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Root as Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'
import * as Label from '@/components/ui/label'

type FormData = {
  email: string
  firstName: string
  lastName: string
  department: string
  universityCompany: string
  title: string
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
      } catch {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <Card className="w-full shadow-lg border-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-6 mobile:gap-4 pt-6">
          {error && <Message className={''} error={error} />}

          {/* Email */}
          <div className="grid gap-2">
            <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
              E-mail <span className="text-red-500">*</span>
            </Label.Root>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              hasError={!!errors.email}
              {...register("email", { required: "Email is required" })}
              className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Name and Surname */}
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label.Root htmlFor="firstName" className="text-label-sm text-text-strong-950">
                Name <span className="text-red-500">*</span>
              </Label.Root>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                hasError={!!errors.firstName}
                {...register("firstName", { required: "Name is required" })}
                className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label.Root htmlFor="lastName" className="text-label-sm text-text-strong-950">
                Surname <span className="text-red-500">*</span>
              </Label.Root>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                hasError={!!errors.lastName}
                {...register("lastName", { required: "Surname is required" })}
                className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          {/* Department */}
          <div className="grid gap-2">
            <Label.Root htmlFor="department" className="text-label-sm text-text-strong-950">
              Department <span className="text-red-500">*</span>
            </Label.Root>
            <Input
              id="department"
              type="text"
              placeholder="Economics"
              hasError={!!errors.department}
              {...register("department", { required: "Department is required" })}
              className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
            />
            {errors.department && (
              <span className="text-sm text-red-500">{errors.department.message}</span>
            )}
          </div>

          {/* University/Company */}
          <div className="grid gap-2">
            <Label.Root htmlFor="universityCompany" className="text-label-sm text-text-strong-950">
              University/Company <span className="text-red-500">*</span>
            </Label.Root>
            <Input
              id="universityCompany"
              type="text"
              placeholder="University of São Paulo"
              hasError={!!errors.universityCompany}
              {...register("universityCompany", { required: "University/Company is required" })}
              className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
            />
            {errors.universityCompany && (
              <span className="text-sm text-red-500">{errors.universityCompany.message}</span>
            )}
          </div>

          {/* Title */}
          <div className="grid gap-2">
            <Label.Root htmlFor="title" className="text-label-sm text-text-strong-950">
              Title <span className="text-red-500">*</span>
            </Label.Root>
            <select
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`h-12 mobile:h-10 border ${errors.title ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3 bg-white`}
            >
              <option value="">Select your title...</option>
              <option value="student">Student</option>
              <option value="phd_student">PhD Student</option>
              <option value="post_doc">Post-Doc</option>
              <option value="assistant_professor">Assistant Professor</option>
              <option value="associate_professor">Associate Professor</option>
              <option value="full_professor">Full Professor</option>
            </select>
            {errors.title && (
              <span className="text-sm text-red-500">{errors.title.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label.Root htmlFor="password" className="text-label-sm text-text-strong-950">
              Password <span className="text-red-500">*</span>
            </Label.Root>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
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

          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label.Root htmlFor="passwordConfirm" className="text-label-sm text-text-strong-950">
              Confirm Password <span className="text-red-500">*</span>
            </Label.Root>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              hasError={!!errors.passwordConfirm}
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) => value === password.current || "Passwords do not match"
              })}
              className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
            />
            {errors.passwordConfirm && (
              <span className="text-sm text-red-500">{errors.passwordConfirm.message}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-0">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full h-12 mobile:h-10 rounded-none"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <div className="text-center text-paragraph-sm text-text-sub-600">
            Already have an account?{' '}
            <Link href={`/sign-in${allParams}`} className="text-primary-base text-label-sm hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

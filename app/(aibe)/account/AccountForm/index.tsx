'use client'

import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Root as Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from '../../_components/Message'
import { useAuth } from '../../_providers/Auth'
import * as Label from '@/components/ui/label';

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
        // Only send password if changing password
        const updateData = changePassword 
          ? data 
          : {
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              department: data.department,
              universityCompany: data.universityCompany,
              title: data.title,
            }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          body: JSON.stringify(updateData),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess(changePassword ? 'Password updated successfully.' : 'Profile updated successfully.')
          setError('')
          setChangePassword(false)
          reset({
            email: json.doc.email,
            firstName: json.doc.firstName || '',
            lastName: json.doc.lastName || '',
            department: json.doc.department || '',
            universityCompany: json.doc.universityCompany || '',
            title: json.doc.title || '',
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset, changePassword],
  )

  useEffect(() => {
    if (user === null) {
      router.push(`/sign-in?unauthorized=account`)
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        department: user.department || '',
        universityCompany: user.universityCompany || '',
        title: user.title || '',
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  // Get subscription info
  const subscriptionPlan = user?.subscriptionPlan || 'free'
  const subscriptionStatus = user?.subscriptionStatus
  const subscriptionEndDate = user?.subscriptionCurrentPeriodEnd

  const planNames = {
    free: 'Free',
    premium: 'Premium',
    founders: 'Founders'
  }

  const planDescriptions = {
    free: 'Basic access to public content',
    premium: 'Full access to all content and events',
    founders: 'Lifetime premium access with exclusive benefits'
  }

  return (
    <div className="grid gap-8">
      {/* Success/Error Messages */}
      {(error || success) && (
        <Message className={''} error={error} success={success} />
      )}

      {/* Subscription Plan Card */}
      <Card className="w-full shadow-lg border-0">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
                Your Subscription
              </CardTitle>
              <CardDescription className="text-paragraph-md mobile:text-paragraph-sm text-text-sub-600">
                Current plan and billing information
              </CardDescription>
            </div>
            <div className={`px-4 py-2 rounded-lg ${
              subscriptionPlan === 'founders' ? 'bg-purple-100 text-purple-800' :
              subscriptionPlan === 'premium' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <span className="font-semibold text-sm uppercase">{planNames[subscriptionPlan as keyof typeof planNames]}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-paragraph-md text-text-strong-950 font-medium mb-1">
              {planNames[subscriptionPlan as keyof typeof planNames]} Plan
            </p>
            <p className="text-paragraph-sm text-text-sub-600">
              {planDescriptions[subscriptionPlan as keyof typeof planDescriptions]}
            </p>
            {subscriptionStatus && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-paragraph-sm text-text-sub-600">
                  <strong>Status:</strong> {subscriptionStatus}
                </p>
                {subscriptionEndDate && (
                  <p className="text-paragraph-sm text-text-sub-600 mt-1">
                    <strong>Next billing:</strong> {new Date(subscriptionEndDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
          {subscriptionPlan === 'free' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-paragraph-sm text-blue-900">
                <strong>Upgrade to Premium</strong> to access exclusive content, workshops, and networking opportunities.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant="primary"
            size="medium"
            className="rounded-none h-12"
          >
            <a href="/membership">
              {subscriptionPlan === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
            </a>
          </Button>
        </CardFooter>
      </Card>

      {/* Profile Information Card */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
              Profile Information
            </CardTitle>
            <CardDescription className="text-paragraph-md mobile:text-paragraph-sm text-text-sub-600">
              Update your personal and professional information
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 mobile:gap-4">
            {/* Email */}
            <div className="grid gap-2">
              <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
                Email Address <span className="text-red-500">*</span>
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
                className={`h-12 mobile:h-10 border ${
                  errors.title ? 'border-red-500' : 'border-gray-200'
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
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              className="w-full h-12 mobile:h-10 rounded-none"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Change Password Card */}
      <Card className="w-full shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">
            Password & Security
          </CardTitle>
          <CardDescription className="text-paragraph-md mobile:text-paragraph-sm text-text-sub-600">
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!changePassword ? (
            <div className="text-center py-6">
              <p className="text-paragraph-md text-text-sub-600 mb-4">
                Keep your account secure by using a strong, unique password.
              </p>
              <Button
                type="button"
                variant="neutral"
                size="medium"
                className="rounded-none h-12"
                onClick={() => setChangePassword(true)}
              >
                Change Password
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-2">
                <Label.Root htmlFor="password" className="text-label-sm text-text-strong-950">
                  New Password <span className="text-red-500">*</span>
                </Label.Root>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  hasError={!!errors.password}
                  {...register("password", { 
                    required: changePassword ? "Password is required" : false,
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

              <div className="grid gap-2">
                <Label.Root htmlFor="passwordConfirm" className="text-label-sm text-text-strong-950">
                  Confirm New Password <span className="text-red-500">*</span>
                </Label.Root>
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="••••••••"
                  hasError={!!errors.passwordConfirm}
                  {...register("passwordConfirm", { 
                    required: changePassword ? "Please confirm your password" : false,
                    validate: (value) => !changePassword || value === password.current || "Passwords do not match"
                  })}
                  className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
                />
                {errors.passwordConfirm && (
                  <span className="text-sm text-red-500">{errors.passwordConfirm.message}</span>
                )}
              </div>

              <div className="flex gap-3 mobile:flex-col">
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  className="flex-1 h-12 mobile:h-10 rounded-none"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </Button>
                <Button
                  type="button"
                  variant="neutral"
                  size="medium"
                  className="flex-1 h-12 mobile:h-10 rounded-none"
                  onClick={() => setChangePassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

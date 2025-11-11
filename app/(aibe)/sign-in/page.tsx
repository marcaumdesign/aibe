"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiLoader2Line } from "@remixicon/react";
import { Root as Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import { Root as Checkbox } from "@/components/ui/checkbox";
import { signIn } from "@/lib/auth-client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (loading) return;

      await signIn.email(
        { email, password },
        {
          onRequest: () => setLoading(true),
          onResponse: () => setLoading(false),
        },
      );
    },
    [email, loading, password],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      {/* Header Spacer for fixed header */}
      <div className="h-20 fixed top-0 left-0 right-0" />

      <div className="w-full max-w-6xl mx-auto px-4 py-12 mobile:py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logo.svg"
              alt="AIBE Logo"
              width={150}
              height={56}
              className="h-14 w-auto"
            />
          </Link>
          <h1 className="text-title-h1 mobile:text-title-h2 text-text-strong-950">
            Welcome Back!
          </h1>
          <p className="text-paragraph-lg text-text-sub-600 max-w-md">
            Sign in to access your AIBE account and stay connected with the Brazilian-Italian economics community.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
              <div>
                <h3 className="text-title-h6 text-text-strong-950 mb-1">Access Exclusive Content</h3>
                <p className="text-paragraph-sm text-text-sub-600">Get access to workshops, events, and research materials.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
              <div>
                <h3 className="text-title-h6 text-text-strong-950 mb-1">Network with Researchers</h3>
                <p className="text-paragraph-sm text-text-sub-600">Connect with economists from Brazil and Italy.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary-base mt-2"></div>
              <div>
                <h3 className="text-title-h6 text-text-strong-950 mb-1">Stay Updated</h3>
                <p className="text-paragraph-sm text-text-sub-600">Receive newsletters and event notifications.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.svg"
                alt="AIBE Logo"
                width={113}
                height={42}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <Card className="w-full shadow-lg border-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="text-title-h3 mobile:text-title-h4 text-text-strong-950">Sign In</CardTitle>
                <CardDescription className="text-paragraph-md mobile:text-paragraph-sm text-text-sub-600">
                  Enter your email below to log in to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 mobile:gap-4">
                <div className="grid gap-2">
                  <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
                    Email
                  </Label.Root>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 mobile:h-10 border-2 border-gray-400 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label.Root htmlFor="password" className="text-label-sm text-text-strong-950">
                      Password
                    </Label.Root>
                    <Link
                      href="#"
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 mobile:h-10 border-2 border-gray-400 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(value) => setRememberMe(Boolean(value))}
                  />
                  <Label.Root htmlFor="remember" className="text-paragraph-sm text-text-sub-600 cursor-pointer">
                    Remember me
                  </Label.Root>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-0">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  className="w-full h-12 mobile:h-10 rounded-none"
                  disabled={loading}
                >
                  {loading ? (
                    <RiLoader2Line size={20} className="animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <div className="text-center text-paragraph-sm text-text-sub-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up" className="text-primary-base text-label-sm hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-paragraph-sm text-text-sub-600 hover:text-primary-base transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

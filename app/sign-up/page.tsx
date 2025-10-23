"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { RiLoader2Line, RiCloseLine } from "@remixicon/react";
import { Root as Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (loading) return;

      if (password !== passwordConfirmation) {
        toast.error("Passwords do not match.");
        return;
      }

      try {
        const imagePayload = image ? await convertImageToBase64(image) : "";

        await signUp.email(
          {
            email,
            password,
            name: `${firstName} ${lastName}`.trim(),
            image: imagePayload,
            callbackURL: "/",
          },
          {
            onRequest: () => setLoading(true),
            onResponse: () => setLoading(false),
            onError: (ctx) => { toast.error(ctx.error.message) },
            onSuccess: () => router.push("/"),
          },
        );
      } catch (error) {
        setLoading(false);
        toast.error(
          error instanceof Error ? error.message : "Failed to create account.",
        );
      }
    },
    [
      email,
      firstName,
      image,
      lastName,
      loading,
      password,
      passwordConfirmation,
      router,
    ],
  );

  return (
    <Card className="z-50 rounded-md rounded-t-none max-w-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label.Root htmlFor="first-name">First name</Label.Root>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                />
              </div>
              <div className="grid gap-2">
                <Label.Root htmlFor="last-name">Last name</Label.Root>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  onChange={(event) => setLastName(event.target.value)}
                  value={lastName}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label.Root htmlFor="email">Email</Label.Root>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <Label.Root htmlFor="password">Password</Label.Root>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
              />
            </div>
            <div className="grid gap-2">
              <Label.Root htmlFor="password_confirmation">
                Confirm Password
              </Label.Root>
              <Input
                id="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="grid gap-2">
              <Label.Root htmlFor="image">Profile Image (optional)</Label.Root>
              <div className="flex items-end gap-4">
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 w-full">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {imagePreview && (
                    <RiCloseLine
                      className="cursor-pointer"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 border-t pt-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <RiLoader2Line size={16} className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>
          <p className="text-center text-xs text-neutral-500">
            Secured by <span className="text-orange-400">better-auth.</span>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

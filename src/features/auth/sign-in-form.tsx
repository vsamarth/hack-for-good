"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { signIn } from "./actions";

export default function SignInForm() {
  const [serverError, formAction, isPending] = useActionState(
    signIn,
    undefined,
  );
  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <form className="flex flex-col gap-6" action={formAction}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-semibold">Sign in</h1>
                <p className="text-balance text-sm text-neutral-500 dark:text-neutral-400">
                  Enter your details below to continue to your account
                </p>
              </div>
              <div className="grid gap-6">
                {serverError && (
                  <p className="text-center text-sm font-medium text-red-600">
                    {serverError}
                  </p>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={isPending}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

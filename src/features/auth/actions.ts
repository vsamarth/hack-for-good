"use server";

import { signIn as authSignIn } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";
export async function signIn(_: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const { email, password } = data;
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return "Incorrect email or password";
    }

    throw error;
  }
}

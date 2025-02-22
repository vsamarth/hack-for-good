"use server";

import { signIn } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";
export default async function action(_: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const { email, password } = data;
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    console.error("sign in", error);
    if (error instanceof CredentialsSignin) {
      return "Incorrect email or password";
    }

    throw error;
  }
}

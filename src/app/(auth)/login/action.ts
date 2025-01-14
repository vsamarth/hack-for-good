"use server";

import { signIn } from "@/server/auth";
import { CredentialsSignin } from "next-auth";

export default async function action(_: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    await signIn("credentials", {
      ...data,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("sign in", error);
    if (error instanceof CredentialsSignin) {
      return "Incorrect email or password";
    }

    throw error;
  }
}

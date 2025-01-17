"use server";

import { signIn as authSignIn } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { CredentialsSignin } from "next-auth";
import { db } from "@/lib/db";
export async function signIn(_: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const { email, password } = data;
    const role = await db.query.users.findFirst({
      where: eq(users.email, email as string),
    }).then((user) => user?.role);
    await authSignIn("credentials", {
      email,
      password,
      redirectTo: role === "admin" ? "/admin-dashboard" : "/resident-dashboard",
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return "Incorrect email or password";
    }

    throw error;
  }
}

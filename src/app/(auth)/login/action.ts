"use server";

import { signIn } from "@/lib/auth";
import { CredentialsSignin } from "next-auth";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";
export default async function action(_: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const { email, password } = data;
    const user = await db.query.users.findFirst({
      where: eq(users.email, email as string),
    });
    console.log(user);
    await signIn("credentials", {
      email,
      password,
      redirectTo: user?.role === "admin" ? "/admin-dashboard" : "/resident-dashboard",
    });
  } catch (error) {
    console.error("sign in", error);
    if (error instanceof CredentialsSignin) {
      return "Incorrect email or password";
    }

    throw error;
  }
}

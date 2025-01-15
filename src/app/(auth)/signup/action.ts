"use server";

import { signIn} from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function action(_: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const { firstName, lastName, email, password } = data;

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email as string),
    });

    if (existingUser) {
      return "User with this email already exists";
    }



    // Create new user
    await db.insert(users).values({
      email: email as string,
      name: `${firstName} ${lastName}`,
      passwordHash: password as string,
    });

    // Sign in the newly created user
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/resident-dashboard",
    });
  } catch (error) {
    console.error("sign up", error);
    return "Failed to create account";
  }
}

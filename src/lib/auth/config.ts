import {
  CredentialsSignin,
  type DefaultSession,
  type NextAuthConfig,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "../db";
import { verify } from "@node-rs/argon2";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authConfig = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const validationResult = signInSchema.safeParse(credentials);
        if (!validationResult.success) {
          throw new CredentialsSignin();
        }
        const { email, password } = validationResult.data;
        const existingUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, email),
        });
        if (
          !existingUser ||
          !(await verify(existingUser.passwordHash, password))
        ) {
          throw new CredentialsSignin();
        }
        return { email };
      },
    }),
  ],
} satisfies NextAuthConfig;

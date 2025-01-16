import { type Metadata } from "next";
import SignInForm from "@/features/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Login() {
  return <SignInForm />;
}

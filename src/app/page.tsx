"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-100 to-blue-300">
      <nav className="bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-2xl font-bold text-blue-600">
                  MWH Minimart
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Contact
              </Link>
              <button
                onClick={() => router.push("/login")}
                className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex flex-grow flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to MWH Minimart
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your one-stop shop for all your needs
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <button
              onClick={() => router.push("/signup")}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
            <button
              onClick={() => router.push("/shop")}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2023 MWH Minimart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

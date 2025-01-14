'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-300">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">MWH Minimart</span>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                About
              </Link>
              <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Contact
              </Link>
              <button
                onClick={() => router.push('/login')}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
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
              onClick={() => router.push('/signup')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign Up
            </button>
            <button
              onClick={() => router.push('/shop')}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2023 MWH Minimart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


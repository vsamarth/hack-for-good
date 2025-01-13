'use client'

import { useRouter } from 'next/navigation' 
import Login from './login/page'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-400 text-black">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <button onClick={() => router.push('/login')}>Login</button>
        <button onClick={() => router.push('/signup')}>Signup</button>
      </div>
    </main>
  );
}

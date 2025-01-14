'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChoiceChip } from '@/components/choice-chip'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('resident');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
    console.log('Signup attempted with:', { username, password, confirmPassword, userType });
    router.push('/resident-dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-400">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
        </div>
        <div className="flex space-x-4">
            <Tabs>
                <TabsList className="flex justify-center">
                <TabsTrigger 
                  value="resident" 
                  className='bg-white text-gray-600 hover:bg-gray-100'
                  onClick={() => setUserType('resident')}
                >
                  Resident
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className='bg-white text-gray-600 hover:bg-gray-100  ml-2'
                  onClick={() => setUserType('admin')}
                >
                  Admin
                </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Type
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500"
              onClick={() => router.push('/login')}
            >
              Already have an account? Login
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none"
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}


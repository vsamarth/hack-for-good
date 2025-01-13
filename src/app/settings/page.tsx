'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function Settings() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
  const [profilePic, setProfilePic] = useState('/default-avatar.png');

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add profile update logic here
    console.log('Profile update attempted:', {
      firstName,
      lastName,
      dateOfBirth,
      age: calculateAge(dateOfBirth),
      role: 'Resident'
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-400">
      <div className="w-full max-w-2xl space-y-8 rounded-lg bg-white p-8 shadow-lg m-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
          <p className="mt-2 text-gray-600">Role: Resident</p>
        </div>

        <div className="flex justify-center">
          <div className="relative h-32 w-32">
            <Image
              src={profilePic}
              alt="Profile picture"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="text"
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
                value={calculateAge(dateOfBirth)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}

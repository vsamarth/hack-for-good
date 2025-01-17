'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import VoucherManagement from 'src/components/voucher-management'
import { Inventory } from 'src/components/inventory'
import { OrganizationManagement } from 'src/components/organization-management'

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inventory');

  const navItems = [
    { id: 'inventory', label: 'Inventory' },
    { id: 'vouchers', label: 'Voucher Management' },
    { id: 'organization', label: 'Organization Management' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Navigation Bar */}
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full rounded-lg px-4 py-2 text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="fixed bottom-0 w-64 p-4 border-t bg-white">
          <button
            onClick={() => router.push('/settings')}
            className="w-full rounded-lg px-4 py-2 text-left text-gray-600 hover:bg-gray-100 mb-2"
          >
            Settings
          </button>
          <button
            onClick={() => router.push('/login')}
            className="w-full rounded-lg px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {activeTab === 'inventory' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            <Inventory />
          </div>
        )}

        {activeTab === 'vouchers' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Voucher Management</h1>
            <VoucherManagement />
          </div>
        )}

        {activeTab === 'organization' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Organization Management</h1>
            <OrganizationManagement />
          </div>
        )}
      </main>
    </div>
  )
}
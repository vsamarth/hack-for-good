'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface Voucher {
  id: number
  voucherCode: string
  voucherValue: number
  residentId: number
  expiryDate: string
  usedStatus: boolean
}

export default function VoucherManagement() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch('/api/auth/vouchers')
        if (!response.ok) {
          throw new Error('Failed to fetch vouchers')
        }
        const data = await response.json()
        setVouchers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch vouchers')
      } finally {
        setLoading(false)
      }
    }

    fetchVouchers()
  }, [])

  if (loading) {
    return <div className="text-center p-8">Loading vouchers...</div>
  }

  if (error) {
    return <div className="text-red-500 p-8">Error: {error}</div>
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Voucher Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Grant Voucher
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Voucher Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resident ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {voucher.voucherCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${voucher.voucherValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {voucher.residentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {voucher.expiryDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    voucher.usedStatus 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {voucher.usedStatus ? 'Used' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

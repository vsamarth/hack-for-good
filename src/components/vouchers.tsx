'use client'

import { useState, useEffect } from 'react'
import { Label } from './ui/label'

interface Voucher {
  id: number
  voucherCode: string
  voucherValue: number
  residentId: number
  expiryDate: string
  usedStatus: boolean
}

export function Vouchers() {
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
    return <div className="text-center">Loading vouchers...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {vouchers.map((voucher) => (
        <div
          key={voucher.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative min-h-[200px] flex flex-col"
        >
          {/* Expiry date at top right */}
          <div className="absolute top-4 right-4 text-gray-500 text-sm">
            Expires on {voucher.expiryDate}
          </div>

          {/* Main content */}
          <div className="flex flex-col items-center mt-10">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              {voucher.voucherCode}
            </div>
            <div className={`font-bold text-2xl mb-4 ${voucher.usedStatus ? 'text-red-600' : 'text-green-600'}`}>
              ${voucher.voucherValue.toFixed(2)}
            </div>
          </div>

          {/* Status label at bottom center */}
          <div className="mt-auto flex justify-center pb-2">
            <Label 
              className={`
                px-4 py-1 rounded-full 
                ${voucher.usedStatus 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-green-100 text-green-600'
                }
              `}
            >
              {voucher.usedStatus ? 'Used' : 'Not Used'}
            </Label>
          </div>
        </div>
      ))}
      {vouchers.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No vouchers available
        </div>
      )}
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'


interface Voucher {
  id: number
  code: string
  amount: number
  residentName: string
  issuedAt: string
  expiresAt: string
  usedAt: string
  usedStatus: boolean
}

interface Resident {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function VoucherManagement() {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [residentList, setResidentList] = useState<Resident[]>([]);
  const [userIdSelected, setUserIdSelected] = useState<string | null>(null);
  const [voucherValue, setVoucherValue] = useState<number | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);
  
  
  useEffect(() => {
    const fetchResidentList = async () => {
      const response = await fetch('/api/auth/residents')
      const data = await response.json()
      setResidentList(data)
    }
    fetchResidentList()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userIdSelected, voucherCode, voucherValue, expiryDate);
    const response = await fetch('/api/auth/grant-voucher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        userId: userIdSelected, 
        voucherCode, 
        voucherValue, 
        expiryDate: new Date(expiryDate as string).toISOString()
      }),
    });
    if (response.ok) {
      setVoucherModalOpen(false);
      setUserIdSelected(null);
      setVoucherCode(null); 
      setVoucherValue(null);
      setExpiryDate(null);
      window.location.reload();
    }
    
  }

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
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading vouchers...</div>
  }

  if (error) {
    return <div className="text-red-500 p-8">Error: {error}</div>
  }

  return (
    <div className="p-8">
      <Dialog open={voucherModalOpen} onOpenChange={setVoucherModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grant Voucher</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-neutral-500 dark:text-neutral-400" role="document">
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="resident">Select Resident</Label>
                <select 
                  id="resident"
                  className="w-full rounded-md border border-gray-300 p-2"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setUserIdSelected(selectedId);
                  }}
                >
                  <option value="">Select a resident...</option>
                  {residentList.map((resident) => (
                    <option key={resident.id} value={resident.id}>
                      {resident.name}
                    </option>
                  ))}
                </select>
              </div>
                <div className="grid gap-2">
                  <Label htmlFor="voucherCode">Voucher Code</Label>
                  <Input
                    type="text"
                    id="voucherCode"
                    placeholder="Enter voucher code"
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                </div>
              <div className="grid gap-2">
                <Label htmlFor="voucherValue">Voucher Value ($)</Label>
                <Input
                  type="number"
                  id="voucherValue"
                  min="0"
                  step="1"
                  placeholder="Enter voucher value ($)"
                  onChange={(e) => setVoucherValue(Number(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  type="date"
                  id="expiryDate"
                  placeholder="Enter expiry date"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Grant Voucher</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Voucher Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
          setVoucherModalOpen(true);
        }}>
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
                Value ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resident Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issued Date
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
                  {voucher.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${voucher.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {voucher.residentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(voucher.issuedAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(voucher.expiresAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
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

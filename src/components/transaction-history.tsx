'use client'

import { useState, useEffect } from 'react'

interface Transaction {
  id: number
  date: string
  amount: number
  type: string
  description: string
  status: string
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/auth/transaction-history')
        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }
        const data = await response.json()
        setTransactions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return <div className="text-center">Loading transactions...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div className="grid gap-4 mt-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              {transaction.description}
            </div>
            <div className="text-gray-500">
              {new Date(transaction.date).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className={`text-2xl font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(transaction.amount).toFixed(2)}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Type: {transaction.type}
          </div>
        </div>
      ))}
      
      {transactions.length === 0 && (
        <div className="text-center text-gray-500">
          No transactions found
        </div>
      )}
    </div>
  )
}

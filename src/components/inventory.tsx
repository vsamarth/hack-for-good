'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddItemModal } from '@/components/add-item-modal'

interface InventoryItem {
  id: string
  itemName: string
  itemDescription: string | null
  itemImage: string | null
  itemPrice: number
  quantity: number
}

export function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/auth/inventory')
        if (!response.ok) {
          throw new Error('Failed to fetch inventory')
        }
        const data = await response.json()
        setInventory(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch inventory')
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [])

  const addItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const item = { ...newItem, id: Date.now().toString() }
    setInventory([...inventory, item])
  }

  if (loading) {
    return <div className="text-center">Loading inventory...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div>
      <Button 
        className="absolute top-20 right-8 mb-10"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>
      
      <div className="grid gap-4 mt-20">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-800">
                {item.itemName}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                item.quantity > 20 ? 'bg-green-100 text-green-800' :
                item.quantity > 10 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Stock: {item.quantity}
              </div>
            </div>
            <div className="mt-2 text-gray-600">
              Price: ${item.itemPrice.toFixed(2)}
            </div>
          </div>
        ))}
        
        {inventory.length === 0 && (
          <div className="text-center text-gray-500">
            No inventory items found
          </div>
        )}
      </div>

      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAddItem={addItem}
      />
    </div>
  )
}


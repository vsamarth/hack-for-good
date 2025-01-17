'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { inventory } from '@/lib/db/schema'

type InventoryItem = typeof inventory.$inferSelect;

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAddItem: (item: Omit<InventoryItem, "id">) => void
}

export function AddItemModal({ isOpen, onClose, onAddItem }: AddItemModalProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    const response = await fetch('/api/inventory', {
      method: 'POST',
      body: JSON.stringify({ itemName: name, itemDescription: description, itemImage: "imageurl", itemPrice: price, quantity: quantity })
    });
    if (response.ok) {
      onAddItem({
        itemName: name,
        itemPrice: parseFloat(price),
        quantity: parseInt(quantity, 10),
        itemDescription: description,
        itemImage: "imageurl"
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input 
              id="price" 
              type="number" 
              min="0" 
              step="0.01" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="quantity">Stock</Label>
            <Input 
              id="quantity" 
              type="number" 
              min="0" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <Button type="submit">Add Item</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


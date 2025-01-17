"use client";

import { useState, useEffect } from "react";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

export function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/auth/inventory");
        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch inventory",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const addItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const item = { ...newItem, id: Date.now().toString() }
    setInventory([...inventory, item])
  }

  if (loading) {
    return <div className="text-center">Loading inventory...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-4 grid gap-4">
      {inventory.map((item) => (
        <div
          key={item.id}
          className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800">
              {item.name}
            </div>
            <div
              className={`rounded-full px-3 py-1 text-sm ${
                item.quantity > 20
                  ? "bg-green-100 text-green-800"
                  : item.quantity > 10
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              Stock: {item.quantity}
            </div>
          </div>
        </div>
      ))}

      {inventory.length === 0 && (
        <div className="text-center text-gray-500">
          No inventory items found
        </div>
      )}
    </div>
  );
}


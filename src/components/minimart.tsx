"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react';

interface MinimartItem {
  id: number;
  itemName: string;
  quantity: number;
  itemPrice: number;
  itemDescription: string;
}

export function Minimart() {
  const [items, setItems] = useState<MinimartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch("/api/inventory");
        if (!response.ok) {
          throw new Error("Failed to fetch minimart inventory");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch minimart inventory"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading minimart items...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Muhammadiyah Minimart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={`/placeholder.svg?height=225&width=400`}
                alt={item.itemName}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{item.itemName}</h2>
                <span className="text-2xl font-bold text-green-600">${item.itemPrice.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.itemDescription}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>In Stock: {item.quantity}</span>
                {item.quantity < 5 && (
                  <span className="text-red-500 font-semibold">Low Stock!</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <Button className="w-full" disabled={item.quantity === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {item.quantity === 0 ? "Out of Stock" : "Request Item"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No minimart items found
        </div>
      )}
    </div>
  );
}


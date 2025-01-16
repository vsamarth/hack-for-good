"use client";

import { useState, useEffect } from "react";

interface MinimartPurchase {
  id: number;
  date: string;
  amount: number;
  residentId: number;
}

export function MinimartPurchases() {
  const [purchases, setPurchases] = useState<MinimartPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch("/api/auth/minimart-purchases");
        if (!response.ok) {
          throw new Error("Failed to fetch minimart purchases");
        }
        const data = await response.json();
        setPurchases(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch minimart purchases",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return <div className="text-center">Loading purchases...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-4 grid gap-4">
      {purchases.map((purchase) => (
        <div
          key={purchase.id}
          className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800">
              Purchase #{purchase.id}
            </div>
            <div className="text-gray-500">
              {new Date(purchase.date).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold text-green-600">
            ${purchase.amount.toFixed(2)}
          </div>
        </div>
      ))}

      {purchases.length === 0 && (
        <div className="text-center text-gray-500">
          No minimart purchases found
        </div>
      )}
    </div>
  );
}

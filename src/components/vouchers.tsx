"use client";

import { useState, useEffect } from "react";
import { Label } from "./ui/label";

interface Voucher {
  id: number;
  code: string;
  amount: number;
  issuedAt: string;
  expiresAt: string;
  usedAt: string;
  usedStatus: boolean;
}

export function Vouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch("/api/vouchers");
        if (!response.ok) {
          throw new Error("Failed to fetch vouchers");
        }
        const data = await response.json();
        setVouchers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch vouchers",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  if (loading) {
    return <div className="text-center">Loading vouchers...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {vouchers.map((voucher) => (
        <div
          key={voucher.id}
          className="relative flex min-h-[200px] flex-col rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          {/* Expiry date at top right */}
          <div className="absolute right-4 top-4 text-sm text-gray-500">
            Expires on {new Date(voucher.expiresAt).toLocaleDateString()}
          </div>

          {/* Main content */}
          <div className="mt-10 flex flex-col items-center">
            <div className="mb-2 text-lg font-semibold text-gray-800">
              {voucher.code}
            </div>
            <div
              className={`mb-4 text-2xl font-bold ${voucher.usedStatus ? "text-red-600" : "text-green-600"}`}
            >
              ${voucher.amount.toFixed(2)}
            </div>
          </div>

          {/* Status label at bottom center */}
          <div className="mt-auto flex justify-center pb-2">
            <Label
              className={`rounded-full px-4 py-1 ${
                voucher.usedStatus
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              } `}
            >
              {voucher.usedStatus ? "Used" : "Not Used"}
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
  );
}

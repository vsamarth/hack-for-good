"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Voucher {
  id: number;
  code: string;
  amount: number;
  residentName: string;
  issuedAt: string;
  expiresAt: string;
  usedAt: string;
  usedStatus: boolean;
}

interface Resident {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function VoucherManagement() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [residentList, setResidentList] = useState<Resident[]>([]);
  const [userIdSelected, setUserIdSelected] = useState<string | null>(null);
  const [voucherValue, setVoucherValue] = useState<number | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchResidentList = async () => {
      const response = await fetch("/api/residents");
      const data = await response.json();
      console.log(data);
      setResidentList(data);
    };
    fetchResidentList();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userIdSelected, voucherCode, voucherValue, expiryDate);
    const response = await fetch("/api/vouchers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userIdSelected,
        voucherCode,
        voucherValue,
        expiryDate: new Date(expiryDate as string).toISOString(),
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
  };

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
    return <div className="p-8 text-center">Loading vouchers...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <Dialog open={voucherModalOpen} onOpenChange={setVoucherModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grant Voucher</DialogTitle>
          </DialogHeader>
          <div
            className="text-sm text-neutral-500 dark:text-neutral-400"
            role="document"
          >
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
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Grant Voucher
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Voucher Management</h1>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => {
            setVoucherModalOpen(true);
          }}
        >
          Grant Voucher
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Voucher Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Value ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Resident Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Issued Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {voucher.code}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  ${voucher.amount}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {voucher.residentName}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(voucher.issuedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {new Date(voucher.expiresAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      voucher.usedStatus
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {voucher.usedStatus ? "Used" : "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

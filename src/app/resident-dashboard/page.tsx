"use client";

import { Minimart } from "@/components/minimart";
import { TransactionHistory } from "@/components/transaction-history";
import { Vouchers } from "@/components/vouchers";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("analytics");

  const navItems = [
    { id: "analytics", label: "Analytics" },
    { id: "transactions", label: "Transaction History" },
    { id: "minimart", label: "Minimart" },
    { id: "vouchers", label: "Vouchers" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Navigation Bar */}
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full rounded-lg px-4 py-2 text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="fixed bottom-0 w-64 border-t bg-white p-4">
          <button
            onClick={() => router.push("/settings")}
            className="mb-2 w-full rounded-lg px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
          >
            Settings
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full rounded-lg px-4 py-2 text-left text-gray-600 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {activeTab === "analytics" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
            <h2> Work in progress</h2>
          </div>
        )}

        {activeTab === "transactions" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Transaction History
            </h1>
            <TransactionHistory />
          </div>
        )}

        {activeTab === "minimart" && (
          <div>
            <Minimart />
          </div>
        )}

        {activeTab === "vouchers" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vouchers</h1>
            <Vouchers />
          </div>
        )}
      </main>
    </div>
  );
}

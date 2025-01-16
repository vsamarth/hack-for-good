"use client";

import { useState, useEffect } from "react";

interface OrganizationMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export function OrganizationManagement() {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/auth/organization");
        if (!response.ok) {
          throw new Error("Failed to fetch organization members");
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch organization members",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return <div className="text-center">Loading organization members...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-4 grid gap-4">
      <div className="relative p-6">
        <div className="absolute right-0 top-0">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            Add Member
          </button>
        </div>
      </div>
      {members.map((member) => (
        <div
          key={member.id}
          className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-gray-800">
                {member.name}
              </div>
              <div className="text-sm text-gray-600">
                {member.email} • {member.phone}
              </div>
            </div>
            <div
              className={`rounded-full px-3 py-1 text-sm ${
                member.role === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {member.role}
            </div>
          </div>
        </div>
      ))}

      {members.length === 0 && (
        <div className="text-center text-gray-500">
          No organization members found
        </div>
      )}
    </div>
  );
}

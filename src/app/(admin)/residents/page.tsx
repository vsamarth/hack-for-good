import { Heading } from "@/components/heading";
import { columns } from "./columns";
import { type Metadata } from "next";
import { db } from "@/lib/db";
import { DataTable } from "@/components/data-table";

export const metadata: Metadata = {
  title: "Dashboard: Residents",
};

export default async function Residents() {
  const users = await db.query.users.findMany();
  return (
    <div className="container mx-auto grid gap-8">
      <Heading title="Residents" description="View and manage residents" />
      <DataTable columns={columns} data={users} />
    </div>
  );
}

import { Heading } from "@/components/heading";
import { columns } from "./columns";
import { type Metadata } from "next";
import { db } from "@/lib/db";
import { DataTable } from "@/components/data-table";

export const metadata: Metadata = {
  title: "Dashboard: Residents",
};

export default async function Products() {
  const products = await db.query.products.findMany();
  return (
    <div className="container mx-auto grid gap-8">
      <Heading title="Products" description="View and manage products" />
      <DataTable columns={columns} data={products} />
    </div>
  );
}

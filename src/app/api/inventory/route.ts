import { inventory, users, vouchers, VoucherStatus } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const inventoryList = await db.query.inventory.findMany();
  return NextResponse.json(inventoryList, { status: 200 });
}

export async function POST(request: Request) {
    const { itemName, itemDescription, itemImage, itemPrice, quantity } = await request.json();
    const item = await db.insert(inventory).values({
      itemName, itemDescription, itemImage, itemPrice, quantity });
    return NextResponse.json(item, { status: 200 });
}
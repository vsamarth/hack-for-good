import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const residents = await db.query.users.findMany({
    where: eq(users.role, "resident"),
  });
  return NextResponse.json(residents, { status: 200 });
}
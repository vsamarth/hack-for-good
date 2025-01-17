import { users, vouchers, VoucherStatus } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
    const { userId, voucherCode, voucherValue, expiryDate } = await request.json();
    console.log(userId, voucherCode, voucherValue, expiryDate);
    const voucher = await db.insert(vouchers).values({
      code: voucherCode,
      residentId: userId as string,
      expiresAt: new Date(expiryDate as string),
      issuedAt: new Date(),
      amount: voucherValue,
      status: VoucherStatus.PENDING,
    });
    console.log(voucher);
    return NextResponse.json(voucher, { status: 200 });
}

export async function GET(request: Request) {
    const session = await auth();
    const email = session?.user?.email;
    const user = await db.query.users.findFirst({
      where: eq(users.email, email as string),
    });
    console.log(user);
    if (user?.role === 'admin') {
      const voucherList = await db.select().from(vouchers).leftJoin(users, eq(vouchers.residentId, users.id));
      const formattedList = voucherList.map(row => ({
        ...row.vouchers,
        residentName: row.users?.name
      }));
      return new Response(JSON.stringify(formattedList), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const voucherList = await db.query.vouchers
      .findMany({
        where: eq(vouchers.residentId, user?.id as string),
      });
    return NextResponse.json(voucherList, { status: 200 });
}

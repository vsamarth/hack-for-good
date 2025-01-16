import { minimartPurchasesMockData } from "./mockData";
import { transactionHistoryMockData } from "./mockData";
import { inventoryMockData } from "./mockData";
import { organizationMockData } from "./mockData";
import { inventory, users, vouchers, VoucherStatus } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
// import * as Minio from 'minio';

// const minioClient = new Minio.Client({
//   endPoint: 'localhost',
//   port: 9000,
//   useSSL: true,
//   accessKey: '17drbuiFjSUl9ewdg5rp',
//   secretKey: 'XVWnBYcEBibvQxXqmEdJRVOUhImynyUXOwJzKWot'
// });

// const BUCKET_NAME = 'hfg-trial';


export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.pathname === '/api/auth/grant-voucher') {
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
      return new Response(JSON.stringify({ message: 'Voucher granted' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (url.pathname === '/api/auth/add-item') {
      const { itemName, itemDescription, itemImage, itemPrice, quantity } = await request.json();
      const item = await db.insert(inventory).values({
        itemName, itemDescription, itemImage, itemPrice, quantity });
      return new Response(JSON.stringify({ message: 'Item added' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to grant voucher' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.pathname === '/api/auth/vouchers') {
      const session = await auth();
      const email = session?.user?.email;
      const user = await db.query.users.findFirst({
        where: eq(users.email, email as string),
      });
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
      return new Response(JSON.stringify(voucherList), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (url.pathname === '/api/auth/minimart-purchases') {
      // TODO: fetch minimart purchases from database
      return new Response(JSON.stringify(minimartPurchasesMockData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (url.pathname === '/api/auth/transaction-history') {
      // TODO: fetch transaction history from database
      return new Response(JSON.stringify(transactionHistoryMockData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (url.pathname === '/api/auth/inventory') {
      const inventory = await db.query.inventory.findMany();
      return new Response(JSON.stringify(inventory), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (url.pathname === '/api/auth/organization') {
      // TODO: fetch organization from database
      return new Response(JSON.stringify(organizationMockData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else if (url.pathname === '/api/auth/residents') {
      // Check if user has admin role, else 403 Forbidden
      const session = await auth();
      const email = session?.user?.email;
      const user = await db.query.users.findFirst({
        where: eq(users.email, email as string),
      });
      const role = user?.role;
      if (role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      const residents = await db.query.users.findMany({
        where: eq(users.role, "resident"),
      });
      return new Response(JSON.stringify(residents), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch vouchers' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



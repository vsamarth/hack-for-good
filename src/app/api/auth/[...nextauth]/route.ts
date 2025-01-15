import { handlers } from "@/lib/auth";
import { vouchersMockData } from "./mockData";
import { minimartPurchasesMockData } from "./mockData";
import { transactionHistoryMockData } from "./mockData";
import { inventoryMockData } from "./mockData";
import { organizationMockData } from "./mockData";
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.pathname === '/api/auth/vouchers') {
      // TODO: fetch vouchers from database
      return new Response(JSON.stringify(vouchersMockData), {
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
      // TODO: fetch inventory from database
      return new Response(JSON.stringify(inventoryMockData), {
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
    } else {
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch vouchers' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



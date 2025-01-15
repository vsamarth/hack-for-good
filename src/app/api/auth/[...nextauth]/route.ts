import { handlers } from "@/lib/auth";

export const vouchersMockData = [
  {
    id: 1,
    voucherCode: "WELCOME2024",
    voucherValue: 50,
    expiryDate: "2025-01-01",
    residentId: 1,
    usedStatus: false
  },
  {
    id: 2, 
    voucherCode: "NEWYEAR24",
    voucherValue: 100,
    expiryDate: "2025-01-01",
    residentId: 1,
    usedStatus: false
  },
  {
    id: 3,
    voucherCode: "DISCOUNT50",
    voucherValue: 25,
    expiryDate: "2025-01-01",
    residentId: 2,
    usedStatus: true
  }
];

export async function getVouchers() {
  try {
    return new Response(JSON.stringify(vouchersMockData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch vouchers' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json', 
      },
    });
  }
}

export async function GET(request: Request) {
  try {
    console.log("GET request received");
    return new Response(JSON.stringify(vouchersMockData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch vouchers' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



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
    usedStatus: true,
  },
];

export const minimartPurchasesMockData = [
  {
    id: 1,
    date: "2024-01-01",
    amount: 100,
    residentId: 1,
  },
];

export const transactionHistoryMockData = [
  {
    id: 1,
    date: "2024-01-01",
    amount: 100,
    type: "purchase",
    description: "Minimart purchase",
    status: "completed",
  },
];
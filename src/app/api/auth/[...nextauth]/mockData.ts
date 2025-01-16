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

export const inventoryMockData = [
  {
    id: 1,
    name: "Item 1",
    quantity: 10,
    price: 100,
  },
  {
    id: 2,
    name: "Item 2",
    quantity: 20,
    price: 200,
  },
  {
    id: 3,
    name: "Item 3",
    quantity: 30,
    price: 300,
  },
];

export const organizationMockData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    role: "admin",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "1234567890",
    role: "resident",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "1234567890",
    role: "admin",
  },
];
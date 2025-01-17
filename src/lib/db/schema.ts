import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["admin", "resident"]);
export const userStatusEnum = pgEnum("user_status", ["active", "suspended"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: rolesEnum("role").default("resident"),
  status: userStatusEnum("status").default("active"),
  phone: text("phone"),
});

export enum VoucherStatus {
  PENDING = "pending",
  USED = "used",
  EXPIRED = "expired",
}

export const vouchers = pgTable("vouchers", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  residentId: uuid("resident_id").references(() => users.id),
  amount: integer("amount").notNull(),
  issuedAt: timestamp("issued_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  status: text("status").notNull().default(VoucherStatus.PENDING),
});

export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  itemName: text("item_name").notNull(),
  itemDescription: text("item_description"),
  itemImage: text("item_image"),
  itemPrice: integer("item_price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  transactionDate: timestamp("transaction_date").notNull().defaultNow(),
  transactionAmount: integer("transaction_amount").notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  image: text("image"),
});

export type User = InferSelectModel<typeof users>;
export type Product = InferSelectModel<typeof products>;
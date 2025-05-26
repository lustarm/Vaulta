// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

// use sqlite for now

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `Vaulta_${name}`);

export const accounts = createTable(
  "accounts",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }),
    balance: d.integer({ mode: "number" }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(new Date())
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
    userId: d.integer({ mode: "number" }).references(() => users.id),
    accountNumber: d.text({ length: 256 }),
    accountType: d.text({ length: 256 }),
    accountStatus: d.text({ length: 256 }),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const users = createTable(
  "users",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(new Date())
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
    email: d.text({ length: 256 }),
    password: d.text({ length: 256 }),
    firstName: d.text({ length: 256 }),
    lastName: d.text({ length: 256 }),
    balance: d.integer({ mode: "number" }),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const userAccounts = createTable(
  "user_accounts",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: d.integer({ mode: "number" }).references(() => users.id),
    accountId: d.integer({ mode: "number" }).references(() => accounts.id),
  }),
  (t) => [index("user_id_idx").on(t.userId), index("account_id_idx").on(t.accountId)],
);

export const transactions = createTable(
  "transactions",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: d.integer({ mode: "number" }).references(() => users.id),
    accountId: d.integer({ mode: "number" }).references(() => accounts.id),
    amount: d.integer({ mode: "number" }),
    transactionType: d.text({ length: 256 }),
    transactionDate: d.integer({ mode: "timestamp" }),
    transactionStatus: d.text({ length: 256 }),
  }),
  (t) => [index("user_id_idx").on(t.userId), index("account_id_idx").on(t.accountId)],
);

export const accountTransactions = createTable(
  "account_transactions",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    accountId: d.integer({ mode: "number" }).references(() => accounts.id),
    transactionId: d.integer({ mode: "number" }).references(() => transactions.id),
  }),
  (t) => [index("account_id_idx").on(t.accountId), index("transaction_id_idx").on(t.transactionId)],
);
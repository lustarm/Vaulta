// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { singlestoreTableCreator } from "drizzle-orm/singlestore-core";
import { varchar, timestamp, bigint } from "drizzle-orm/singlestore-core"

export const createTable = singlestoreTableCreator(
  (name) => `vaulta_${name}`
)

export const account = createTable(
  "accounts", {
    id: bigint({ mode: "bigint", unsigned: true }).primaryKey(),
    userId: bigint({ mode: "bigint", unsigned: true }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    balance: bigint({ mode: "bigint", unsigned: true }).notNull(),
    createdAt: timestamp("created_at").default(new Date()),
    updatedAt: timestamp("updated_at").default(new Date()),
  }
);

export const users = createTable(
  "users", {
    id: bigint({ mode: "bigint", unsigned: true }).primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").default(new Date()),
    updatedAt: timestamp("updated_at").default(new Date()),
  }
);

export const transaction = createTable(
  "transactions", {
    id: bigint({ mode: "bigint", unsigned: true }).primaryKey(),
    accountId: bigint({ mode: "bigint", unsigned: true }).notNull(),
    amount: bigint({ mode: "bigint", unsigned: true }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").default(new Date()),
    updatedAt: timestamp("updated_at").default(new Date()),
  },
);

export const session = createTable(
  "sessions", {
    userId: bigint({ mode: "bigint", unsigned: true }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    maxAge: bigint({ mode: "bigint", unsigned: true }).notNull(),
    createdAt: timestamp("created_at").default(new Date()),
    updatedAt: timestamp("updated_at").default(new Date()),
  }
);

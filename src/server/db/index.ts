import { drizzle } from "drizzle-orm/mysql2";
import { createPool, type Pool } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

const connection = globalForDb.pool ?? createPool(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.pool = connection;

export const db = drizzle(connection, { schema, mode: "default" });
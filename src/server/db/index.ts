import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Pool for DB so we can use the same connection for multiple queries
 */
const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

const conn = 
  globalForDb.pool ?? 
  createPool({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
    maxIdle: 0,
  });
if (env.NODE_ENV !== "production") globalForDb.pool = conn;

conn.addListener("connection", (conn) => {
  console.log("Connected to SingleStore DB");
});

export const db = drizzle(conn, { schema });

import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: 'singlestore',
  tablesFilter: ["Vaulta_*"],
  dbCredentials: {
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    database: env.SINGLESTORE_DB_NAME,

    ssl: {},
  },
} satisfies Config;

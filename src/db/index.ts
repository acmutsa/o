// import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// export * from "drizzle-orm";
// export * from "./functions";
// export * from "./zod";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_SECRET,
});

export const db = drizzle(client, { schema });

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  driver: "turso",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: `${process.env.DATABASE_URL}`,
    authToken: process.env.TURSO_SECRET as string,
  },
  out: "./src/db/drizzle",
});

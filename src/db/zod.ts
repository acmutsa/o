import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { userTable } from "./schema";

export const insertUserSchema = createInsertSchema(userTable);

export const updateUserSchema = createInsertSchema(userTable, {
  roles: z.string().array().min(1),
}).omit({
  id: true,
  notionId: true,
  email: true,
});

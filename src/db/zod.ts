import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { userTable } from "./schema";

export const insertUserSchema = createInsertSchema(userTable);

export const updateUserSchema = createInsertSchema(userTable, {
  firstName:z.string().min(1).max(200),
  lastName: z.string().min(1).max(200),
  roles: z.string({ message: "Invalid set of roles" }).array().min(1),
  birthday: z.date({ message: "Unable to parse birthday" }),
  phone: z
    .string({ message: "Invalid phone number format" })
    .regex(
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?\s?[\s.-]?\s?\d{3}\s?[\s.-]?\s?\d{4}$/gm
    ),
}).omit({
  id: true,
  notionId: true,
  email: true,
});

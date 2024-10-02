import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";
import { userTable } from "./schema";

export const insertUserSchema = createInsertSchema(userTable);

export const updateUserSchema = createInsertSchema(userTable, {
  firstName: z.string().min(1).max(200),
  lastName: z.string().min(1).max(200),
  roles: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .min(1),
  birthday: z.date({ message: "Unable to parse birthday" }),
  phone: z
    .string()
    .regex(
      /^(\+\d{1,2}\s?)?\(?\d{3}\)?\s?[\s.-]?\s?\d{3}\s?[\s.-]?\s?\d{4}$/gm,
      { message: "Invalid phone number format" }
    ),
}).omit({
  id: true,
  notionId: true,
  email: true,
});

export const selectUserSchema = createSelectSchema(userTable, {
  roles: z.array(z.string().min(1)).min(1),
}).omit({
  isRegistrationComplete: true,
});

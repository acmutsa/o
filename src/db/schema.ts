import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

// Lucia stuffs
export const userTable = sqliteTable("user", {
  id: text("id").primaryKey(),
  notionId: text("notion_id").notNull().unique(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  roles: text("roles", { mode: "json" }).$type<string[]>(),
  birthday: integer("birthday", { mode: "timestamp" }),
  isRegistrationComplete: integer("registration_complete", { mode: "boolean" })
    .notNull()
    .default(false),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const meetings = sqliteTable("meeting", {
  id: text("id").primaryKey(),
  potentialStartDate: integer("potential_start_date", { mode: "timestamp" }),
  potentialEndDate: integer("potential_end_date", { mode: "timestamp" }),
  name: text("name").notNull(),
  location: text("location"),
  description: text("description"),
});

"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { uUser } from "@/lib/types";

export async function getUser(id: string) {
  return db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  });
}

export async function updateUserInfo(userId: string, userInfo: uUser) {
  return await db
    .update(userTable)
    .set(userInfo)
    .where(eq(userTable.id, userId))
    .returning({ id: userTable.id });
}

export async function isRegistered(userId: string) {
  return (
    await db.query.userTable.findFirst({
      where: eq(userTable.id, userId),
      columns: {
        isRegistrationComplete: true,
      },
    })
  )?.isRegistrationComplete;
}

export async function getAllOfficers() {
  return await db.query.userTable.findMany({
    where: eq(userTable.isRegistrationComplete, true),
    columns: {
      isRegistrationComplete: false,
    },
  });
}

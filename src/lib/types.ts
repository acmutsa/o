import { updateUserSchema } from "@/db/zod";
import z from "zod";

const uUserWithRoleStrings = updateUserSchema.merge(
  z.object({
    roles: z.string().array().min(1),
  })
);

export type uUser = z.infer<typeof uUserWithRoleStrings>;

import { updateUserSchema } from "@/db/zod";
import z from "zod";

export type uUser = z.infer<typeof updateUserSchema>;

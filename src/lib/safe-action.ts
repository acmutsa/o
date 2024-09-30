import { validateRequest } from "@/auth";
import {
  createSafeActionClient,
  returnValidationErrors,
} from "next-safe-action";
import z from "zod";

export const publicAction = createSafeActionClient();

export const authenticatedAction = publicAction.use(async ({ next, ctx }) => {
  const { user } = await validateRequest();

  if (!user) {
    return returnValidationErrors(z.null(), {
      _errors: ["Unauthorized (No user id)"],
    });
  }

  return next({ ctx: { user, ...ctx } });
});

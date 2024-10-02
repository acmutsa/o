"use server";
import { authenticatedAction } from "@/lib/safe-action";
import { updateUserSchema } from "@/db/zod";
import { updateUserInfo, isRegistered } from "@/db/functions/officers";
import z from "zod";
import { returnValidationErrors } from "next-safe-action";

export const registerUser = authenticatedAction
  .schema(updateUserSchema.required())
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (await isRegistered(user.id)) {
      returnValidationErrors(z.null(), {
        _errors: ["User has already completed registration"],
      });
    }

    const userId = await updateUserInfo(user.id, {
      ...parsedInput,
      roles: parsedInput.roles!.map((val) => val.text),
      isRegistrationComplete: true,
    });

    if (!userId) {
      returnValidationErrors(z.null(), { _errors: ["Update unsuccessful!"] });
    }

    return {
      success: true,
    };
  });

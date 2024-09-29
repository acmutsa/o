import { authenticatedAction } from "@/lib/safe-action";
import { updateUserSchema } from "@/db/zod";
import { updateUserInfo, isRegistered } from "@/db/functions";
import z from "zod";
import { returnValidationErrors } from "next-safe-action";

export const registerUser = authenticatedAction
  .schema(updateUserSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (await isRegistered(user.id)) {
      returnValidationErrors(z.null(), {
        _errors: ["User has already completed registration"],
      });
    }

    const userId = await updateUserInfo(user.id, {
      isRegistrationComplete: true,
      ...parsedInput,
    });

    if (!userId) {
      returnValidationErrors(z.null(), { _errors: ["Update unsuccessful!"] });
    }

    return {
      success: true,
    };
  });

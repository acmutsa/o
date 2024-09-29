import { Suspense } from "react";
import { getUser } from "@/db/functions";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import OnboardingFlow from "@/components/onboardingFlow";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  const oUser = await getUser(user.id);

  if (oUser?.isRegistrationComplete) {
    return redirect("/app");
  }

  return (
    <div className="flex flex-col w-full ">
      <h1 className="font-black">Onboarding</h1>
      <div className="min-h-screen max-w-5xl px-5 pb-10 pt-[20vh]">
        <OnboardingFlow />
      </div>
    </div>
  );
}

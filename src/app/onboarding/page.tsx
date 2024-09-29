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
    <main className="dark:bg-zinc-950">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-10 pt-[20vh] font-sans dark:text-white space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-5xl font-black md:text-8xl">Onboarding</h1>
          <p className="font-medium">
            Welcome to the officer onboarding. Please fill out the following
            info to get started.
          </p>
        </div>
        <OnboardingFlow />
      </div>
    </main>
  );
}

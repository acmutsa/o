import OnboardingFlow from "./test";
export default function Page() {
  console.log("called");
 return(
   <main className="dark:bg-zinc-950">
					<div className="mx-auto min-h-screen max-w-5xl px-5 pb-10 pt-[20vh] font-sans dark:text-white">
						<h1 className="text-6xl font-black md:text-8xl">
							Onboarding
						</h1>
						<p className="mt-5 font-medium">
							Welcome to the officer onboarding. Please fill out the following info to get started.
						</p>
						<OnboardingFlow
							/>
					</div>
				</main>
 )
}

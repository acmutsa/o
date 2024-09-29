import { NotionSignInButtonComponent } from "@/components/app-components-notion-sign-in-button";
import OnboardingFlow from "@/components/onboardingFlow"
// app/login/page.tsx
export default async function Page() {
	return (
		<>
			<h1>Sign in</h1>
			<a href="/login/notion">
				<NotionSignInButtonComponent />
			</a>
		</>
	);
}

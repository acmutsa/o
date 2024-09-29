import Image from "next/image";
import { validateRequest } from "@/auth";
import Bubble from "@/components/bubble";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
	const { user } = await validateRequest();

	return (
		<main className="w-full mx-auto page-wrap max-w-5xl flex flex-col gap-y-5">
			<div className="flex items-center justify-start w-full pb-10">
				<h1 className="font-black text-5xl">Meetings</h1>
				<Button className="justify-self-end ml-auto">New Meeting</Button>
			</div>
		</main>
	);
}

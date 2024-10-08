import Image from "next/image";
import { validateRequest } from "@/auth";
import Bubble from "@/components/bubble";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
	const { user } = await validateRequest();

	return (
		<main className="w-full mx-auto page-wrap max-w-5xl flex flex-col gap-y-5">
			<h1 className="font-black text-5xl pb-10">Home</h1>
			<Bubble title="Quick Links" className="flex gap-x-2">
				<Link href={"https://notion.so/acmutsa"}>
					<Button>Notion</Button>
				</Link>
				<Link href={"https://portal.acmutsa.org/admin"}>
					<Button>Portal Admin</Button>
				</Link>
				<Link href={"https://tally.so/"}>
					<Button>Tally Forms</Button>
				</Link>
				<Link href={"https://wiki.acmutsa.org/"}>
					<Button>ACM Wiki</Button>
				</Link>
			</Bubble>
			<Bubble title="Upcoming Meetings"></Bubble>
		</main>
	);
}

import Navbar from "@/components/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = await validateRequest();

	if (!user) {
		return redirect("/login");
	}

	return (
		<div className="min-w-screen h-screen font-general-sans">
			{/* <div className="bg-[#F7F7F5] w-[275px] min-h-screen flex flex-col items-start p-2">
				<div className="min-h-20 w-full flex items-center gap-x-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<h1 className="font-bold">Liam Murray</h1>
				</div>
			</div> */}
			<Navbar />
			<div className="h-screen overflow-scroll w-screen">{children}</div>
		</div>
	);
}

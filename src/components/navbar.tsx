import Link from "next/link";
import { NavBarItem } from "./nav-items";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

export default function Navbar() {
	return (
		<div className="bg-black">
			<div className="grid grid-cols-4 min-h-24 max-w-5xl mx-auto">
				<div className="flex items-center">
					<Link href={"/app"}>
						<Image src={"/img/o_logo.png"} height={40} width={40} alt="O logo" />
					</Link>
				</div>
				<div className="col-span-2 flex items-center justify-center w-full">
					<div className="h-10 border-white border-[1px] rounded-lg w-full grid grid-flow-col justify-stretch p-1 gap-1 max-w-[400px]">
						<NavBarItem path="/">Home</NavBarItem>
						<NavBarItem path="/directory">Directory</NavBarItem>
						<NavBarItem path="/meetings">Meet</NavBarItem>
						<NavBarItem path="/profile">Profile</NavBarItem>
					</div>
				</div>
				<div className="flex items-center justify-end">
					<Avatar className="w-[40px] h-[40px]">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</div>
	);
}

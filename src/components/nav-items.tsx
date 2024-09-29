"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface SideBarItemProps {
	children: React.ReactNode;
	path: string;
}

export function NavBarItem({ children, path }: SideBarItemProps) {
	const currPath = usePathname();

	return (
		<Link
			className={
				(path !== "/" && currPath.replace("/app", "").startsWith(path)) ||
				(currPath == "/app" && path == "/")
					? "text-black bg-white flex items-center justify-center font-bold rounded-lg"
					: "text-white flex items-center justify-center font-medium rounded-lg"
			}
			href={"/app" + path}
		>
			{/* <HomeIcon className="h-4 w-4" />
        Home */}
			{children}
		</Link>
	);
}

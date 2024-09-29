import { cn } from "@/lib/utils";

interface bubbleProps {
	children?: React.ReactNode;
	title: string;
	className?: string;
}

export default function Bubble({ children, title, className }: bubbleProps) {
	return (
		<div className={cn(`border-black border rounded p-3 relative`, className ? className : "")}>
			<h3 className="bg-white top-0 -translate-y-[50%] translate-x-1 w-min text-nowrap px-2 font-bold text-xs absolute">
				{title}
			</h3>
			{children}
		</div>
	);
}

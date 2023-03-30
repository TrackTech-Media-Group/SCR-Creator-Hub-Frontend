import Link from "next/link";
import type React from "react";

interface BaseProps {
	src: string;
	name: string;
	href: string;
	type: "video" | "image";
}

type Props = BaseProps;

export const UserCard: React.FC<Props> = ({ src, name, href }) => {
	return (
		<div className="relative z-[0]">
			<Link href={href}>
				<div
					tabIndex={0}
					className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-10"
				>
					<img loading="lazy" src={src} alt={name} className="" />
					<p className="absolute bottom-0 left-0 w-full p-2 text-base bg-gradient-to-t from-black-800 to-transparent">{name}</p>
				</div>
			</Link>
		</div>
	);
};

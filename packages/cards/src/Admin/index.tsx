import type React from "react";
import { ProgressiveImage } from "../Image";
import type { Type } from "@creatorhub/utils";
import Link from "next/link";

interface BaseProps {
	src: string;
	href: string;
	alt: string;
	title: string;
	type: Type;
}

type Props = BaseProps;

export const AdminCard: React.FC<Props> = ({ src, href, alt, title, type }) => {
	return (
		<Link
			href={href}
			className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-10"
		>
			<ProgressiveImage loading="lazy" src={src} alt={alt} className="" height={180} width={320} />
			<p className="absolute bottom-0 left-0 p-1 text-base font-medium bg-gradient-to-t from-black-800 to-black-100 w-full">{title}</p>
		</Link>
	);
};

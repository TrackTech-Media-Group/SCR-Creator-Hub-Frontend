import Link from "next/link";
import React from "react";
import { Label, type LabelProps } from "./Label";
import { Image } from "../Image";

interface BaseProps {
	src: string;
	alt: string;
	href: string;
}

type Props = BaseProps & LabelProps;

export const HomeCard: React.FC<Props> = ({ type, src, alt, href }) => {
	return (
		<Link href={href} className="group w-80 rounded-lg overflow-hidden relative cursor-pointer">
			<div className="absolute grid place-items-center text-title w-full h-full group-hover:bg-black-500 bg-transparent transition-colors">
				<i className="fa-solid fa-magnifying-glass group-hover:opacity-100 opacity-0 transition-opacity" />
			</div>
			<Image loading="lazy" src={src} alt={alt} width={320} height={180} />
			<Label type={type} />
		</Link>
	);
};

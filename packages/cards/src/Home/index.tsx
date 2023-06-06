"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Label, type LabelProps } from "./Label";

interface BaseProps {
	src: string;
	alt: string;
	href: string;
}

type Props = BaseProps & LabelProps;

export const HomeCard: React.FC<Props> = ({ type, src, alt, href }) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<Link href={href}>
			<div
				tabIndex={0}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				className="w-80 rounded-lg overflow-hidden relative cursor-pointer"
			>
				<div
					className={`absolute grid place-items-center text-title w-full h-full ${
						isHovering ? "bg-black-500" : "bg-transparent"
					} transition-colors`}
				>
					<i className={`fa-solid fa-magnifying-glass ${isHovering ? "opacity-100" : "opacity-0"} transition-opacity`} />
				</div>
				<img loading="lazy" src={src} alt={alt} className="" />
				<Label type={type} />
			</div>
		</Link>
	);
};

import { WhiteButton } from "@creatorhub/buttons";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface BaseProps {
	src: string;
	alt: string;
	href: string;
}

type Props = BaseProps;

export const MediaCard: React.FC<Props> = ({ src, alt, href }) => {
	const { push } = useRouter();

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => push(href)}
			className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all"
		>
			<img src={src} alt={alt} className="" />
			<div className="absolute top-3 right-2">
				<WhiteButton type="link" href={href} className="bg-white-400 hover:bg-white-600 px-3 py-[10px]">
					<i className="fa-solid fa-floppy-disk text-lg" />
				</WhiteButton>
				<WhiteButton type="link" href={href} className="bg-white-400 hover:bg-white-600 px-3 py-[10px] ml-2">
					<i className="fa-solid fa-arrow-up-from-bracket text-lg" />
				</WhiteButton>
			</div>
		</div>
	);
};

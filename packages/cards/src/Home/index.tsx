import { useRouter } from "next/router";
import React, { useState } from "react";
import { Label, LabelProps } from "./Label";

interface BaseProps {
	src: string;
	alt: string;
	href: string;
}

type Props = BaseProps & LabelProps;

export const HomeCard: React.FC<Props> = ({ type, src, alt, href }) => {
	const { push } = useRouter();
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => push(href)}
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
			{type === "image" ? (
				<img loading="lazy" src={src} alt={alt} className="" />
			) : (
				<video disablePictureInPicture controls={false} src={src} muted />
			)}
			<Label type={type} />
		</div>
	);
};

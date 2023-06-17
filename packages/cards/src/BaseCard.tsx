import { Type } from "@creatorhub/utils";
import React from "react";
import { ProgressiveImage } from "./Image";

export interface CardProps {
	/** The content type */
	type: Type;

	/** The preview url */
	src: string;

	/** The name of the content item */
	name: string;
}

export const BaseCard: React.FC<React.PropsWithChildren<CardProps>> = ({ src, name, type, children }) => {
	const imageSrc = type === Type.Music ? "/music-thumbnail.png" : src;

	return (
		<div className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-0">
			<ProgressiveImage loading="lazy" width={320} height={180} src={imageSrc} alt={name} />
			<p className="absolute bottom-0 left-0 w-full text-base bg-gradient-to-t from-black-400 to-transparent p-2">{name}</p>
			{children}
		</div>
	);
};

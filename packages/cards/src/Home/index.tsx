import React, { useState } from "react";
import { Label, LabelProps } from "./Label";

interface BaseProps {
	image: string;
	alt: string;
}

type Props = BaseProps & LabelProps;

export const HomeCard: React.FC<Props> = ({ type, image, alt }) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className="w-[370px] rounded-lg overflow-hidden relative cursor-pointer"
		>
			<div
				className={`absolute grid place-items-center text-title w-full h-full ${
					isHovering ? "bg-black-500" : "bg-transparent"
				} transition-colors`}
			>
				<i className={`fa-solid fa-magnifying-glass ${isHovering ? "opacity-100" : "opacity-0"} transition-opacity`} />
			</div>
			<img src={image} alt={alt} className="" />
			<Label type={type} />
		</div>
	);
};

import type React from "react";
import { Label, LabelProps } from "./Label";

interface BaseProps {
	image: string;
	alt: string;
}

type Props = BaseProps & LabelProps;

export const BaseCard: React.FC<Props> = ({ type, image, alt }) => {
	return (
		<div className="w-[370px] rounded-lg overflow-hidden relative">
			<img src={image} alt={alt} />
			<Label type={type} />
		</div>
	);
};

import type React from "react";
import { Label, LabelProps } from "./Label";

interface BaseProps {}

type Props = BaseProps & LabelProps;

export const BaseCard: React.FC<Props> = ({ type }) => {
	return (
		<div className="w-[370px] rounded-lg overflow-hidden relative">
			<img src="/cards_placeholder_image.png" alt="cards_placeholder_image" />
			<Label type={type} />
		</div>
	);
};

import { TransparentButton } from "@creatorhub/buttons";
import React from "react";

interface Props {
	name: string;
	id: string;
	onClick?: (...props: any) => void;
}

export const TagButton: React.FC<Props> = (tag) => {
	const buttonProps: any = tag.onClick ? { onClick: tag.onClick, type: "button" } : { type: "link", href: `/tags/${tag.id}` };

	return (
		<TransparentButton {...buttonProps} className="glass transition-colors border-2 border-transparent hover:border-white-400 hover:!text-white">
			<p className="flex gap-1">
				<span className="text-highlight">#</span> {tag.name}
			</p>
		</TransparentButton>
	);
};

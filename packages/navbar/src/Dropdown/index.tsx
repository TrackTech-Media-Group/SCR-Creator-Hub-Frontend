import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import DropdownComponent, { type DropdownItem } from "./DropdownComponent";

interface Props {
	title: string;
	items: DropdownItem[];
	className?: string;
}

export const Dropdown: React.FC<Props> = ({ title, items, className }) => {
	const [show, setShow] = useState(false);
	const onMouseInteraction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => setShow(event.type === "mouseenter");
	const onKeyInteraction = (event: React.KeyboardEvent<HTMLDivElement>) => setShow(event.key === "Enter" ? !show : show);
	const onClickInteraction = () => setShow(!show);

	return (
		<div
			tabIndex={0}
			role="button"
			onClick={onClickInteraction}
			onKeyDown={onKeyInteraction}
			onMouseEnter={onMouseInteraction}
			onMouseLeave={onMouseInteraction}
			className="relative cursor-pointer"
		>
			<p className="text-base px-2 capitalize">{title}</p>
			<AnimatePresence mode="wait">{show && <DropdownComponent className={className} items={items} />}</AnimatePresence>
		</div>
	);
};

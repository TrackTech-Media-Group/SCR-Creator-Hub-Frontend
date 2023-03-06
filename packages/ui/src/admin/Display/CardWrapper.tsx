import { AdminCard } from "@creatorhub/cards";
import type React from "react";
import { useState } from "react";
import { CardEditModal } from "./CardEditModal";

interface Props {
	name: string;
	type: "video" | "image";
	tags: string[];
	useCases: string[];
	downloads: { url: string; id: string; name: string }[];
	availableTags: { id: string; name: string }[];
}

const CardWrapper: React.FC<Props> = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<CardEditModal isOpen={isOpen} onClick={() => setIsOpen(false)} tags={props.availableTags} onSubmit={() => void 0} data={props} />
			<AdminCard src={props.downloads[0].url} onClick={() => setIsOpen(true)} alt={props.name} title={props.name} />
		</>
	);
};

export default CardWrapper;

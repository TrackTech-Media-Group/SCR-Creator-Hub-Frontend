import { AdminCard } from "@creatorhub/cards";
import type React from "react";
import { useState } from "react";
import { CardEditModal } from "./CardEditModal";

interface Props {
	id: string;
	name: string;
	type: "video" | "image";
	tags: string[];
	useCases: string[];
	downloads: { url: string; id: string; name: string }[];
	availableTags: { id: string; name: string }[];

	updateItem: (...props: any) => void;
}

const CardWrapper: React.FC<Props> = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const updateItem = (..._props: any) => {
		props.updateItem(..._props);
		setIsOpen(false);
	};

	return (
		<>
			<CardEditModal isOpen={isOpen} onClick={() => setIsOpen(false)} tags={props.availableTags} onSubmit={updateItem} data={props} />
			<AdminCard type={props.type} src={props.downloads[0].url} onClick={() => setIsOpen(true)} alt={props.name} title={props.name} />
		</>
	);
};

export default CardWrapper;

import type React from "react";
import CardWrapper from "./Display/CardWrapper";

interface Props {
	tags: { id: string; name: string }[];
	items: ItemsAdmin[];
	updateItem: (...props: any) => void;
	deleteItem: (id: string) => void;
}

export interface ItemsAdmin {
	name: string;
	id: string;
	type: string;
	useCases: string[];
	tagIds: string[];
	downloads: {
		id: string;
		name: string;
		url: string;
		footageId: string;
	}[];
}

export const ItemDisplayGrid: React.FC<Props> = ({ tags, items, updateItem, deleteItem }) => {
	return (
		<div className="pt-20 px-8 flex flex-wrap gap-2">
			{items.map((item) => (
				<CardWrapper
					key={item.id}
					id={item.id}
					availableTags={tags}
					name={item.name}
					tags={item.tagIds}
					type={item.type as "video" | "image"}
					useCases={item.useCases}
					downloads={item.downloads}
					updateItem={updateItem}
					deleteItem={deleteItem}
				/>
			))}
		</div>
	);
};

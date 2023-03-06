import { DangerButton } from "@creatorhub/buttons";
import type React from "react";

interface Props {
	value: { name: string; id: string };
	removeItem: (id: string) => void;
}

export const PartialFileEntry: React.FC<Props> = ({ value, removeItem }) => {
	return (
		<div className="flex items-center justify-between">
			<p className="text-base">{value.name}</p>
			<DangerButton type="button" onClick={() => removeItem(value.id)}>
				<i className="fa-solid fa-trash" />
			</DangerButton>
		</div>
	);
};

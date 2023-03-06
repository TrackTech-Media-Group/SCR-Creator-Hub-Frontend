import { Input, SelectMenu, SelectOption } from "@creatorhub/forms";
import type React from "react";
import { useEffect, useState } from "react";

interface Props {
	pages: number;
	page: number;
	type: string;

	setSearch: (str: string) => void;
	setPage: (page: number) => void;
	setType: (type: string) => void;
}

export const FilterBar: React.FC<Props> = ({ setSearch, setPage, setType, page, pages, type }) => {
	const pageOptions = Array(pages)
		.fill(null)
		.map((_, k) => ({ label: `Page ${k + 1}`, value: k }));

	const [_search, _setSearch] = useState("");
	const [timeout, setTimeoutFn] = useState<NodeJS.Timeout>();
	useEffect(() => {
		const newTimeout = setTimeout(() => {
			setSearch(_search);
			setTimeoutFn(undefined);
		}, 1e3);

		clearTimeout(timeout);
		setTimeoutFn(newTimeout);

		return () => clearTimeout(timeout);
	}, [_search]);

	return (
		<div className="pt-20 px-8 gap-2 flex items-center">
			<Input
				type="primary"
				placeholder="Stepford Central..."
				className="w-full"
				onInputCapture={(ctx) => _setSearch(ctx.currentTarget.value)}
			/>
			<SelectMenu
				type="primary"
				options={pageOptions}
				value={{ label: `Page ${page + 1}`, value: page }}
				className="w-56"
				onChange={(opt) => setPage((opt as SelectOption).value)}
			/>
			<SelectMenu
				type="primary"
				options={[
					{ label: "Image", value: "image" },
					{ label: "Video", value: "video" }
				]}
				value={{ label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`, value: type }}
				onChange={(opt) => setType((opt as SelectOption).value)}
				className="w-56"
			/>
		</div>
	);
};

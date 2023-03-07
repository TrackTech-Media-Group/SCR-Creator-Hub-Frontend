import { SelectMenu, SelectOption } from "@creatorhub/forms";
import type React from "react";

interface Props {
	type: string;
	setType: (type: string) => void;

	page: number;
	pages: number;
	setPage: (page: number) => void;
}

const TagBanner: React.FC<Props> = ({ type, setType, page, pages, setPage }) => {
	const pageOptions = Array(pages)
		.fill(null)
		.map((_, k) => ({ label: `Page ${k + 1}`, value: k }));

	return (
		<div className="px-32 bg-media_search_banner bg-no-repeat bg-center min-h-[600px] pt-52 max-md:px-16 max-sm:px-4">
			<div className="flex flex-col justify-center w-full gap-4">
				<div>
					<h1 className="text-3xl">Explore our library</h1>
					<p className="text-base -mt-2">Filter your results below to get more accurate results.</p>
				</div>
				<div className="flex items-center gap-2">
					<SelectMenu
						type="primary"
						options={[
							{ label: "Video", value: "video" },
							{ label: "Image", value: "image" }
						]}
						onChange={(ctx) => setType((ctx as SelectOption).value)}
						value={{ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }}
					/>
					<SelectMenu
						type="primary"
						options={pageOptions}
						value={{ label: `Page ${page + 1}`, value: page }}
						className="w-56"
						onChange={(opt) => setPage((opt as SelectOption).value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default TagBanner;
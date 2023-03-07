import type React from "react";
import { TransparentButton } from "@creatorhub/buttons";
import { SelectMenu, SelectOption } from "@creatorhub/forms";

interface Props {
	page: number;
	pages: number;
	setPage: (page: number) => void;
}

export const PageSelector: React.FC<Props> = ({ page, pages, setPage }) => {
	const pageOptions = Array(pages)
		.fill(null)
		.map((_, k) => ({ label: `Page ${k + 1}`, value: k }));

	const previousPage = () => {
		if (page <= 0) return;
		setPage(page - 1);
	};

	const nextPage = () => {
		if (page >= pages - 1) return;
		setPage(page + 1);
	};

	return (
		<div className="grid place-items-center py-4">
			<div className="flex items-center gap-2">
				<TransparentButton type="button" className="text-xl" onClick={previousPage}>
					<i className="fa-solid fa-arrow-left-long" />
				</TransparentButton>
				<SelectMenu
					type="primary"
					options={pageOptions}
					value={{ label: `Page ${page + 1}`, value: page }}
					className="w-fit"
					onChange={(opt) => setPage((opt as SelectOption).value)}
				/>
				<TransparentButton type="button" className="text-xl" onClick={nextPage}>
					<i className="fa-solid fa-arrow-right-long" />
				</TransparentButton>
			</div>
		</div>
	);
};

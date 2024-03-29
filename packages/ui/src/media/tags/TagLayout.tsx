import type React from "react";
import { Navbar } from "@creatorhub/navbar";
import TagBanner from "./TagBanner";
import { PageSelector } from "../PageSelector";

interface Props {
	tag: string;
	type: string;
	setType: (type: any) => void;

	page: number;
	pages: number;
	setPage: (page: number) => void;
}

export const TagLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, ...props }) => {
	return (
		<>
			<Navbar />
			<TagBanner {...props} />
			<div className="px-32 max-md:px-16 max-sm:px-4">{children}</div>
			<PageSelector {...props} />
		</>
	);
};

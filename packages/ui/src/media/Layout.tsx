import type React from "react";
import { Navbar } from "@creatorhub/navbar";
import SearchBanner from "./SearchBanner";

interface Props {
	searchQuery?: string;
	returnButton?: boolean;
	className?: string;
}

export const MediaLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, returnButton, searchQuery, className }) => {
	return (
		<>
			<Navbar />
			<SearchBanner returnButton={returnButton} searchQuery={searchQuery} />
			<div className={`px-32 max-md:px-16 max-sm:px-4 ${className}`}>{children}</div>
		</>
	);
};

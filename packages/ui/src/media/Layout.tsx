import type React from "react";
import { Navbar } from "@creatorhub/navbar";
import SearchBanner from "./SearchBanner";

interface Props {
	isLoggedIn: boolean;
	searchQuery?: string;
	tag?: string;
	returnButton?: boolean;
	className?: string;
}

export const MediaLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, isLoggedIn, returnButton, searchQuery, tag, className }) => {
	return (
		<>
			<Navbar loggedIn={isLoggedIn} />
			<SearchBanner returnButton={returnButton} searchQuery={searchQuery} tag={tag} />
			<div className={`px-32 max-md:px-16 max-sm:px-4 ${className}`}>{children}</div>
		</>
	);
};

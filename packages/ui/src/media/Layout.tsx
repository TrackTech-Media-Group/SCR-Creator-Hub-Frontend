import type React from "react";
import { Navbar } from "@creatorhub/navbar";
import SearchBanner from "./SearchBanner";

interface Props {
	isLoggedIn: boolean;
	searchQuery?: string;
	tag?: string;
	returnButton?: boolean;
}

export const MediaLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, isLoggedIn, returnButton, searchQuery, tag }) => {
	return (
		<>
			<Navbar loggedIn={isLoggedIn} />
			<SearchBanner returnButton={returnButton} searchQuery={searchQuery} tag={tag} />
			<div className="px-32 max-md:px-16 max-sm:px-4">{children}</div>
		</>
	);
};

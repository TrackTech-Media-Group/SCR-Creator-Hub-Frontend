import type React from "react";
import { Navbar } from "@creatorhub/navbar";
import SearchBanner from "./SearchBanner";

interface Props {
	isLoggedIn: boolean;
	searchQuery?: string;
}

export const MediaLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, isLoggedIn, searchQuery }) => {
	return (
		<>
			<Navbar loggedIn={isLoggedIn} />
			<SearchBanner searchQuery={searchQuery} />
			<div className="px-32 max-md:px-16 max-sm:px-4">{children}</div>
		</>
	);
};

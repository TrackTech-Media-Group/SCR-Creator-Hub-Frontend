import type React from "react";
import { HomeNavbar } from "@creatorhub/navbar";
import SearchBanner from "./SearchBanner";

export const MediaLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<HomeNavbar />
			<SearchBanner />
			<div className="px-32 max-md:px-16 max-sm:px-4">{children}</div>
		</>
	);
};

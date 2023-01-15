import type React from "react";
import { HomeNavbar } from "@creatorhub/navbar";
import SearchBanner from "./SearchBanner";

export const MediaLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<HomeNavbar />
			<SearchBanner />
			{children}
		</>
	);
};

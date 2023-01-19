import type React from "react";
import { HomeNavbar } from "@creatorhub/navbar";

export const MediaDetailsLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<HomeNavbar />
			<div className="px-32 pt-24 max-md:px-16 max-sm:px-4 flex flex-col gap-12">{children}</div>
		</>
	);
};

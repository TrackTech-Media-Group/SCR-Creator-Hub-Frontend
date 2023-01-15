import { HomeNavbar } from "@creatorhub/navbar";
import type React from "react";

export const MediaLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			<HomeNavbar />
			{children}
		</>
	);
};

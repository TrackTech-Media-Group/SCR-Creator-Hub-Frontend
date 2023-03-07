import type React from "react";
import { Navbar } from "@creatorhub/navbar";

interface Props {
	isLoggedIn: boolean;
}

export const MediaDetailsLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, isLoggedIn }) => {
	return (
		<>
			<Navbar loggedIn={isLoggedIn} />
			<div className="px-32 pt-24 max-lg:px-16 max-md:px-8 max-sm:px-4 flex flex-col gap-12">{children}</div>
		</>
	);
};

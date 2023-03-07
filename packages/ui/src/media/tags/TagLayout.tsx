import type React from "react";
import { Navbar } from "@creatorhub/navbar";
import TagBanner from "./TagBanner";

interface Props {
	isLoggedIn: boolean;
	type: string;
	setType: (type: string) => void;
}

export const TagLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, isLoggedIn, type, setType }) => {
	return (
		<>
			<Navbar loggedIn={isLoggedIn} />
			<TagBanner type={type} setType={setType} />
			<div className="px-32 max-md:px-16 max-sm:px-4">{children}</div>
		</>
	);
};

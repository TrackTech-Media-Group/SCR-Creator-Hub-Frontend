import type React from "react";
import { HomeNavbar } from "./HomeNavbar";
import { UserNavbar } from "./UserNavbar";

interface Props {
	loggedIn: boolean;
}

export const Navbar: React.FC<Props> = ({ loggedIn }) => {
	return loggedIn ? <UserNavbar /> : <HomeNavbar />;
};

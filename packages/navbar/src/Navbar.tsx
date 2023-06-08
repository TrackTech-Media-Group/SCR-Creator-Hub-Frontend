import type React from "react";
import { HomeNavbar } from "./Home";
import { UserNavbar } from "./UserNavbar";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { verifySession } from "@creatorhub/utils";

export const Navbar: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const cookie = getCookie("CH-SESSION");
		if (cookie)
			verifySession(cookie as string)
				.then(setIsLoggedIn)
				.catch(() => void 0);
	}, []);

	return isLoggedIn ? <UserNavbar /> : <HomeNavbar />;
};

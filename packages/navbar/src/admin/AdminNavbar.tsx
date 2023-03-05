import { WhiteButton } from "@creatorhub/buttons";
import React, { useEffect, useState } from "react";
import MenuButton from "../MenuButton";
import { SideMenu } from "./SideMenu";

interface Props {
	openCreateItem: () => void;
}

export const AdminNavbar: React.FC<Props> = ({ openCreateItem }) => {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [showBg, setShowBg] = useState(false);

	const toggleMenu = () => setMobileMenu(!mobileMenu);
	const closeMenu = () => setMobileMenu(false);

	useEffect(() => {
		const scrollFn = () => setShowBg(window.scrollY >= 100);
		window.addEventListener("scroll", scrollFn);

		scrollFn();
		return () => window.removeEventListener("scroll", scrollFn);
	}, []);

	return (
		<div
			className={`fixed z-[100] w-screen h-24 py-4 px-8 flex justify-between items-center ${
				showBg ? "bg-main" : "bg-transparent"
			} transition-colors`}
		>
			<div>
				<SideMenu active={mobileMenu} closeMenu={closeMenu} />
				<MenuButton onClick={toggleMenu} active={mobileMenu} />
			</div>
			<div>
				<WhiteButton type="button" onClick={openCreateItem} className="rounded-full h-fit">
					Create Item <i className="fa-solid fa-plus" />
				</WhiteButton>
			</div>
		</div>
	);
};
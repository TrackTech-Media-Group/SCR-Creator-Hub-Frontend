import { TransparentButton, WhiteButton } from "@creatorhub/buttons";
import React, { useState } from "react";
import { HomeMobileMenu } from "./HomeMobileMenu";
import MenuButton from "./MenuButton";

export const HomeNavbar: React.FC = () => {
	const [mobileMenu, setMobileMenu] = useState(false);
	const toggleMenu = () => setMobileMenu(!mobileMenu);
	const closeMenu = () => setMobileMenu(false);

	return (
		<div className="fixed z-[100] w-screen h-24 py-4 px-8 flex justify-between items-center">
			<img src="/logo/logo.png" alt="Creator Hub Logo" className="h-full" />
			<div className="flex gap-11 max-md:hidden">
				<TransparentButton type="button">Products</TransparentButton>
				<TransparentButton type="button">Resources</TransparentButton>
				<WhiteButton type="link" href="/login" extra="rounded-full h-fit">
					Sign in <i className="fa-solid fa-arrow-right-long" />
				</WhiteButton>
			</div>
			<div className="hidden max-md:block">
				<HomeMobileMenu active={mobileMenu} closeMenu={closeMenu} />
				<MenuButton onClick={toggleMenu} active={mobileMenu} />
			</div>
		</div>
	);
};

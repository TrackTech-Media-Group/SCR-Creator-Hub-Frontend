import React, { useState } from "react";
import { BaseNavbar } from "../BaseNavbar";
import { Dropdown } from "../Dropdown";
import useTranslation from "next-translate/useTranslation";
import { WhiteButton } from "@creatorhub/buttons";
import { HomeMobileMenu } from "./HomeMobileMenu";
import MenuButton from "../MenuButton";

export const HomeNavbar: React.FC = () => {
	const { t } = useTranslation();
	const [mobileMenu, setMobileMenu] = useState(false);

	const toggleMenu = () => setMobileMenu(!mobileMenu);
	const closeMenu = () => setMobileMenu(false);

	return (
		<BaseNavbar logoHref="/">
			<div className="flex items-center gap-11 max-md:hidden">
				<Dropdown
					title={t("common:navigation.products")}
					className="columns-1"
					items={[
						{ name: t("common:content_types.video"), icon: "fa-solid fa-film", href: "/video" },
						{ name: t("common:navigation.image"), icon: "fa-solid fa-image", href: "/image" },
						{ name: t("common:content_types.music"), icon: "fa-solid fa-music", href: "/music" }
					]}
				/>
				<Dropdown
					title={t("common:navigation.resources")}
					className="columns-2 gap-x-0"
					items={[
						{ name: t("common:navigation.about"), icon: "fa-solid fa-building", href: "/about" },
						{ name: t("common:navigation.support"), icon: "fa-solid fa-question", href: "/support" },
						{ name: t("common:navigation.tos"), icon: "fa-solid fa-book", href: "/tos" },
						{ name: t("common:navigation.privacy"), icon: "fa-solid fa-fingerprint", href: "/privacy" }
					]}
				/>
				<WhiteButton type="link" href="/login" className="rounded-full h-fit">
					{t("common:buttons.sign_in")} <i className="fa-solid fa-arrow-right-long" />
				</WhiteButton>
			</div>
			<div className="hidden max-md:block">
				<HomeMobileMenu active={mobileMenu} closeMenu={closeMenu} />
				<MenuButton onClick={toggleMenu} active={mobileMenu} />
			</div>
		</BaseNavbar>
	);
};

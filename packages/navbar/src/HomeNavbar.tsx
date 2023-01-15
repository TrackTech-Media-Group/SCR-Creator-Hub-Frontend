import { WhiteButton } from "@creatorhub/buttons";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HomeMobileMenu } from "./HomeMobileMenu";
import HomeNavbarDropdown from "./HomeNavbarDropdown";
import MenuButton from "./MenuButton";

export const HomeNavbar: React.FC = () => {
	const [showProducts, setShowProducts] = useState(false);
	const [showResources, setShowResources] = useState(false);

	const toggleProducts = () => setShowProducts(!showProducts);
	const toggleResources = () => setShowResources(!showResources);

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
			<img src="/logo/logo.png" alt="Creator Hub Logo" className="h-full" />
			<div className="flex items-center gap-11 max-md:hidden">
				<div
					className="relative cursor-pointer"
					tabIndex={0}
					onClick={toggleResources}
					onKeyUp={(ev) => ev.key === "Enter" && toggleProducts()}
					onMouseEnter={() => setShowProducts(true)}
					onMouseLeave={() => setShowProducts(false)}
				>
					<p className="text-base px-2">Products</p>
					<AnimatePresence mode="wait">
						{showProducts && (
							<HomeNavbarDropdown
								items={[
									{ name: "Video", icon: "fa-solid fa-film", href: "/videos" },
									{ name: "Images", icon: "fa-solid fa-image", href: "/images" }
								]}
							/>
						)}
					</AnimatePresence>
				</div>
				<div
					className="relative cursor-pointer"
					tabIndex={0}
					onKeyUp={(ev) => ev.key === "Enter" && toggleResources()}
					onClick={toggleResources}
					onMouseEnter={() => setShowResources(true)}
					onMouseLeave={() => setShowResources(false)}
				>
					<p className="text-base px-2">Resources</p>
					<AnimatePresence mode="wait">
						{showResources && (
							<HomeNavbarDropdown
								items={[
									{ name: "About Us", icon: "fa-solid fa-building", href: "/about" },
									{ name: "Support", icon: "fa-solid fa-question", href: "/support" },
									{ name: "Terms of Service", icon: "fa-solid fa-book", href: "/tos" },
									{ name: "Privacy Policy", icon: "fa-solid fa-fingerprint", href: "/privacy" }
								]}
							/>
						)}
					</AnimatePresence>
				</div>
				<WhiteButton type="link" href="/login" className="rounded-full h-fit">
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

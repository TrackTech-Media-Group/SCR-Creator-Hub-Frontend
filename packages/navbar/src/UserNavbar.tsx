import { TransparentButton, WhiteButton } from "@creatorhub/buttons";
import React, { useEffect, useState } from "react";

export const UserNavbar: React.FC = () => {
	const [showBg, setShowBg] = useState(false);
	const [menu, setMenu] = useState(false);
	const toggleMenu = () => setMenu(!menu);

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
			<div className="flex items-center gap-6">
				<TransparentButton type="link" href="/images" className="max-sm:hidden">
					Images
				</TransparentButton>
				<TransparentButton type="link" href="/videos" className="max-sm:hidden">
					Videos
				</TransparentButton>
				<div className="relative">
					<WhiteButton type="button" className="rounded-full h-fit" onClick={toggleMenu}>
						<i className="fa-solid fa-user" />
					</WhiteButton>
					<div className={`${menu ? "absolute" : "hidden"} z-10 right-0 translate-y-2 bg-white-200 flex flex-col rounded-md`}>
						<div className="flex flex-col gap-y-0">
							<TransparentButton type="link" href="/images" className="max-sm:block sm:hidden !py-0" onClick={() => setMenu(false)}>
								Images
							</TransparentButton>
							<TransparentButton type="link" href="/videos" className="max-sm:block sm:hidden !py-0" onClick={() => setMenu(false)}>
								Videos
							</TransparentButton>
						</div>
						<div className="bg-white-200 w-full h-[2px] my-2 max-sm:block sm:hidden" />
						<div className="flex flex-col gap-y-0">
							<TransparentButton type="link" href="/users/@me" className="!py-0" onClick={() => setMenu(false)}>
								Profile
							</TransparentButton>
							<TransparentButton type="link" href="/logout" className="!py-0" onClick={() => setMenu(false)}>
								Logout
							</TransparentButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

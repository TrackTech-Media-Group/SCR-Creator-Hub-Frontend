import { SecondaryButton, TransparentButton } from "@creatorhub/buttons";
import type React from "react";

interface Props {
	closeMenu: () => void;
	active: boolean;
}

export const SideMenu: React.FC<Props> = ({ active, closeMenu }) => {
	return (
		<div className={`w-screen h-screen z-10 left-0 top-0 ${active ? "fixed" : "hidden"} backdrop-blur`}>
			<div className="absolute w-80 h-screen bg-main pt-20 flex flex-col px-4 gap-4">
				<div>
					<h1 className="text-xl font-bold">Products</h1>
					<div className="flex flex-col gap-2 pl-2">
						<TransparentButton type="link" href="/videos" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-film" /> Video
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/images" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-image" /> Images
							</p>
						</TransparentButton>
					</div>
				</div>
				<div>
					<h1 className="text-xl font-bold">Resources</h1>
					<div className="flex flex-col gap-2 pl-2">
						<TransparentButton type="link" href="/about" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-building" /> About Us
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/support" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-question" /> Support
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/tos" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-book" /> Terms of Service
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/privacy" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-fingerprint" /> Privacy Policy
							</p>
						</TransparentButton>
					</div>
				</div>
				<SecondaryButton type="link" href="/login" onClick={closeMenu}>
					<p className="w-full flex gap-4 justify-center items-center">
						Sign in <i className="fa-solid fa-arrow-right-long" />
					</p>
				</SecondaryButton>
			</div>
		</div>
	);
};

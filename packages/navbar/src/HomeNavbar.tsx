import { TransparentButton, WhiteButton } from "@creatorhub/buttons";
import type React from "react";

export const HomeNavbar: React.FC = () => {
	return (
		<div className="fixed z-[100] w-screen h-24 py-4 px-8 flex justify-between items-center">
			<img src="/logo/logo.png" className="h-full" />
			<div className="flex gap-11">
				<TransparentButton type="button">Products</TransparentButton>
				<TransparentButton type="button">Resources</TransparentButton>
				<WhiteButton type="link" href="/login" extra="rounded-full h-fit">
					Sign in <i className="fa-solid fa-arrow-right-long" />
				</WhiteButton>
			</div>
		</div>
	);
};

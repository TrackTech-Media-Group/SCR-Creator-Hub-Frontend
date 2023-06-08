import Link from "next/link";
import React from "react";
import { useViewport } from "@creatorhub/hooks";
import type { Url } from "next/dist/shared/lib/router/router";

interface Props {
	logoHref: Url;
}

export const BaseNavbar: React.FC<React.PropsWithChildren<Props>> = ({ children, logoHref }) => {
	const showBackground = useViewport((window) => window.scrollY >= 100);

	return (
		<nav
			className={`fixed z-[100] w-screen h-24 py-4 px-8 flex justify-between items-center ${
				showBackground ? "bg-main" : "bg-transparent"
			} transition-colors`}
		>
			<Link href={logoHref}>
				<img src="/logo/logo.png" alt="Creator Hub Logo" className="h-16" />
			</Link>
			{children}
		</nav>
	);
};

import { WhiteButton } from "@creatorhub/buttons";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CardDropdown from "./CardDropdown";

interface BaseProps {
	src: string;
	alt: string;
	href: string;
}

type Props = BaseProps;

export const MediaCard: React.FC<Props> = ({ src, alt, href }) => {
	const { push } = useRouter();
	const [menu, setMenu] = useState(false);

	const toggleMenu = () => setMenu(!menu);
	const copyLink = () => {
		setMenu(false);
	};

	return (
		<div className="relative z-[0]">
			<AnimatePresence mode="wait">
				{menu && (
					<CardDropdown
						items={[
							{ name: "Copy link", icon: "fa-solid fa-link", onClick: copyLink },
							{ name: "Twitter", icon: "fa-brands fa-twitter", href: "https://twitter.com" },
							{ name: "Reddit", icon: "fa-brands fa-reddit", href: "https://reddit.com" }
						]}
					/>
				)}
			</AnimatePresence>
			<div
				role="button"
				tabIndex={0}
				onClick={(ctx) => (ctx.target as any)?.id !== "card-button" && push(href)}
				className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-10"
			>
				<img src={src} alt={alt} className="" />
				<div className="absolute top-3 right-2">
					<WhiteButton id="card-button" type="link" href={href} className="bg-white-400 hover:bg-white-600 px-3 py-[10px]">
						<i id="card-button" className="fa-solid fa-floppy-disk text-lg" />
					</WhiteButton>
					<WhiteButton id="card-button" type="button" onClick={toggleMenu} className="bg-white-400 hover:bg-white-600 px-3 py-[6.5px] ml-2">
						<i id="card-button" className="fa-solid fa-arrow-up-from-bracket text-lg" />
					</WhiteButton>
				</div>
			</div>
		</div>
	);
};

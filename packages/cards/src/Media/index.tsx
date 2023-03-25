import { WhiteButton } from "@creatorhub/buttons";
import Link from "next/link";
import type React from "react";

interface BaseProps {
	src: string;
	name: string;
	href: string;
	type: "video" | "image";
}

type Props = BaseProps;

export const MediaCard: React.FC<Props> = ({ src, name, href, type }) => {
	return (
		<div className="relative z-[0]">
			<Link href={href}>
				<div
					role="button"
					tabIndex={0}
					className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-10"
				>
					{type === "image" ? (
						<img loading="lazy" src={src} alt={name} className="" />
					) : (
						<video disablePictureInPicture controls={false} src={src} muted />
					)}
					<p className="absolute bottom-0 left-0 w-full text-base bg-gradient-to-t from-black-900 to-transparent p-2">{name}</p>
					<div className="absolute top-3 right-2">
						<WhiteButton
							id="card-button"
							type="link"
							href={`${src}?download=true`}
							className="bg-white-400 hover:bg-white-600 py-2 px-[10px]"
						>
							<i id="card-button" className="fa-solid fa-floppy-disk text-lg" />
						</WhiteButton>
					</div>
				</div>
			</Link>
		</div>
	);
};

import { WhiteButton } from "@creatorhub/buttons";
import { useRouter } from "next/router";
import type React from "react";

interface BaseProps {
	src: string;
	alt: string;
	href: string;
	type: "video" | "image";
}

type Props = BaseProps;

export const MediaCard: React.FC<Props> = ({ src, alt, href, type }) => {
	const { push } = useRouter();

	return (
		<div className="relative z-[0]">
			<div
				role="button"
				tabIndex={0}
				onClick={(ctx) => (ctx.target as any)?.id !== "card-button" && push(href)}
				className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-10"
			>
				{type === "image" ? <img src={src} alt={alt} className="" /> : <video disablePictureInPicture controls={false} src={src} muted />}
				<div className="absolute top-3 right-2">
					<WhiteButton id="card-button" type="link" href={href} className="bg-white-400 hover:bg-white-600 py-2 px-[10px]">
						<i id="card-button" className="fa-solid fa-floppy-disk text-lg" />
					</WhiteButton>
				</div>
			</div>
		</div>
	);
};

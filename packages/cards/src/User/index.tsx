import { useRouter } from "next/router";
import type React from "react";

interface BaseProps {
	src: string;
	name: string;
	href: string;
	type: "video" | "image";
}

type Props = BaseProps;

export const UserCard: React.FC<Props> = ({ src, name, href, type }) => {
	const { push } = useRouter();

	return (
		<div className="relative z-[0]">
			<div
				role="button"
				tabIndex={0}
				onClick={(ctx) => (ctx.target as any)?.id !== "card-button" && push(href)}
				className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-10"
			>
				{type === "image" ? (
					<img loading="lazy" src={src} alt={name} className="" />
				) : (
					<video disablePictureInPicture controls={false} src={src} muted />
				)}
				<p className="absolute bottom-0 left-0 w-full p-2 text-base bg-gradient-to-t from-black-800 to-transparent">{name}</p>
			</div>
		</div>
	);
};

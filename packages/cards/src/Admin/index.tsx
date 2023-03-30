import type React from "react";

interface BaseProps {
	src: string;
	alt: string;
	title: string;
	type: "image" | "video";
	onClick: () => void;
}

type Props = BaseProps;

export const AdminCard: React.FC<Props> = ({ src, alt, onClick, title, type }) => {
	return (
		<div className="relative z-[0]">
			<div
				role="button"
				tabIndex={0}
				onClick={(ctx) => (ctx.target as any)?.id !== "card-button" && onClick()}
				className="w-80 rounded-lg overflow-hidden relative cursor-pointer outline outline-transparent hover:outline-white transition-all z-10"
			>
				<img loading="lazy" src={src} alt={alt} className="" />
				<p className="absolute bottom-0 left-0 p-1 text-base font-medium bg-gradient-to-t from-black-800 to-black-100 w-full">{title}</p>
			</div>
		</div>
	);
};

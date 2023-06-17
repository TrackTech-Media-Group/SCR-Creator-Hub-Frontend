import React from "react";
import { type CardProps, BaseCard } from "./BaseCard";
import { WhiteButton } from "@creatorhub/buttons";
import type { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";

type Props = CardProps & { href: Url };

export const MediaCard: React.FC<Props> = (props) => {
	const router = useRouter();

	const onOuterButtonClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (ev.currentTarget.id === "card-download-button") return;
		void router.push(props.href);
	};

	return (
		<div role="button" onClick={onOuterButtonClick}>
			<BaseCard {...props}>
				<div className="absolute top-3 right-2">
					<WhiteButton
						id="card-download-button"
						type="link"
						href={`${props.href}?download=true`}
						className="bg-white-400 hover:bg-white-600 py-2 px-[10px]"
					>
						<i id="card-button" className="fa-solid fa-floppy-disk text-lg" />
					</WhiteButton>
				</div>
			</BaseCard>
		</div>
	);
};

import React, { useState } from "react";
import { type CardProps, BaseCard } from "./BaseCard";
import { WhiteButton } from "@creatorhub/buttons";
import type { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { Type } from "@creatorhub/utils";

type Props = CardProps & { href: Url };

export const MediaCard: React.FC<Props> = (props) => {
	const isMusic = props.type === Type.Music;
	const router = useRouter();
	const [source] = useState(isMusic ? "music-thumbnail.png" : props.src);

	const onOuterButtonClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (ev.currentTarget.id === "card-download-button") return;
		void router.push(props.href);
	};

	const audioRef = React.createRef<HTMLAudioElement>();
	const onHoverStart = () => {
		if (!audioRef.current) return;
		void audioRef.current.play();
	};

	const onHoverEnd = () => {
		if (!audioRef.current) return;
		audioRef.current.currentTime = 0;
		audioRef.current.pause();
	};

	return (
		<div role="button" onClick={onOuterButtonClick} onFocus={onHoverStart} onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
			{isMusic && <audio src={props.src} controls={false} aria-hidden ref={audioRef} />}
			<BaseCard {...props} src={source}>
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

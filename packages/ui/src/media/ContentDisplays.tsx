import { PrimaryButton } from "@creatorhub/buttons";
import { ProgressiveImage } from "@creatorhub/cards";
import { Type } from "@creatorhub/utils";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface Props {
	showFull: boolean;
	setShowFull: (...props: any) => void;

	poster?: string;
	preview: string;
	name: string;
	type: Type;
}

interface ShowButtonProps {
	setShowFull: (...props: any) => void;
	buttonText: string;
}

const ShowButton: React.FC<ShowButtonProps> = ({ setShowFull, buttonText }) => {
	const onClickEvent = () => setShowFull(true);

	return (
		<>
			<PrimaryButton type="button" onClick={onClickEvent} className="absolute bottom-2 z-10">
				{buttonText}
			</PrimaryButton>
			<div className="bg-gradient-to-t from-main absolute bottom-0 w-full h-full" />
		</>
	);
};

const ImageDisplay: React.FC<Props> = ({ name, preview, showFull, setShowFull }) => {
	const { t } = useTranslation();

	return (
		<>
			<div
				aria-expanded={showFull}
				className="relative w-full overflow-hidden aria-expanded:h-auto h-96 grid place-items-center rounded-xl max-md:hidden"
			>
				<ProgressiveImage width="100%" height="100%" loading="lazy" src={preview} alt={name} className="rounded-xl w-full" />
				{!showFull && <ShowButton buttonText={t("content:image_button")} setShowFull={setShowFull} />}
			</div>
			<div className="rounded-xl max-md:block md:hidden">
				<ProgressiveImage width="100%" height="100%" loading="lazy" src={preview} alt={name} className="rounded-xl w-full" />
			</div>
		</>
	);
};

const VideoDisplay: React.FC<Props> = ({ preview, poster, showFull, setShowFull }) => {
	const { t } = useTranslation();

	return (
		<>
			<div
				aria-expanded={showFull}
				className="relative w-full overflow-hidden aria-expanded:h-auto h-96 grid place-items-center rounded-xl max-md:hidden"
			>
				<video controls={showFull} poster={poster} src={preview} className="rounded-xl w-full" />
				{!showFull && <ShowButton buttonText={t("content:video_button")} setShowFull={setShowFull} />}
			</div>
			<div className="rounded-xl max-md:block md:hidden">
				<video controls src={preview} className="rounded-xl w-full" />
			</div>
		</>
	);
};

const MusicDisplay: React.FC<Props> = ({ preview }) => {
	return (
		<div className="relative w-full overflow-hidden mt-8 -mb-8 h-auto grid place-items-center rounded-xl max-md:-mb-4">
			<audio src={preview} controls className="rounded-xl w-full" />
		</div>
	);
};

export const ContentDisplays: React.FC<Props> = (props) => {
	switch (props.type) {
		case Type.Image:
			return <ImageDisplay {...props} />;
		case Type.Video:
			return <VideoDisplay {...props} />;
		case Type.Music:
			return <MusicDisplay {...props} />;
	}
};

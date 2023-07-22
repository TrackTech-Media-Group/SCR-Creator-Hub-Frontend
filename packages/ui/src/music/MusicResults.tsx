import { SecondaryButton } from "@creatorhub/buttons";
import { MediaCard } from "@creatorhub/cards";
import { useMusicResults } from "@creatorhub/hooks";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface Props {
	/** The content duration (download name) */
	duration: string;

	/** The type of content (tag id) */
	type: string;

	/** A function which goes back into history */
	goBackFunction: () => void;
}

export const MusicResults: React.FC<Props> = ({ duration, type, goBackFunction }) => {
	const content = useMusicResults(type, duration);
	const { t } = useTranslation();

	return (
		<div className="px-2">
			<div className="flex flex-col items-center mb-8">
				<h1 className="text-xl max-md:text-base text-center mb-2">{t("music:results.title", { duration, type })}</h1>
				<SecondaryButton type="button" onClick={goBackFunction} className="w-fit">
					<i className="fa-solid fa-arrow-left-long mr-2" /> {t("common:buttons.back")}
				</SecondaryButton>
			</div>
			<div className="flex items-center justify-center flex-wrap gap-4">
				{content.map((item) => (
					<MediaCard key={item.id} href={`/music/${item.id}`} name={item.name} src={item.preview} type={item.type} />
				))}
			</div>
		</div>
	);
};

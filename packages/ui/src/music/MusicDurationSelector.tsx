import { SecondaryButton } from "@creatorhub/buttons";
import { useMusicDuration } from "@creatorhub/hooks";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface Props {
	/** Set state action for setting the duration */
	setDuration: React.Dispatch<string>;

	/** The type of content (tag id) */
	type: string;

	/** A function which goes back into history */
	goBackFunction: () => void;
}

export const MusicDurationSelector: React.FC<Props> = ({ setDuration, type, goBackFunction }) => {
	const durations = useMusicDuration(type);
	const { t } = useTranslation();

	return (
		<div className="px-2">
			<div className="flex flex-col items-center mb-8">
				<h1 className="text-3xl max-md:text-xl text-center mb-2">{t("music:duration.title")}</h1>
				<SecondaryButton type="button" onClick={goBackFunction} className="w-fit">
					<i className="fa-solid fa-arrow-left-long mr-2" /> {t("common:buttons.back")}
				</SecondaryButton>
			</div>
			<div className="flex items-center justify-center flex-wrap gap-4">
				{durations.map((duration) => (
					<SecondaryButton key={duration} type="button" className="text-lg" onClick={() => setDuration(duration)}>
						{duration}
					</SecondaryButton>
				))}
			</div>
		</div>
	);
};

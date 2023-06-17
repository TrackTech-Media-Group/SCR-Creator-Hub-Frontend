import { SecondaryButton } from "@creatorhub/buttons";
import { useMusicDuration } from "@creatorhub/hooks";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface Props {
	/** Set state action for setting the duration */
	setDuration: React.Dispatch<string>;

	/** The type of content (tag id) */
	type: string;
}

export const MusicDurationSelector: React.FC<Props> = ({ setDuration, type }) => {
	const durations = useMusicDuration(type);
	const { t } = useTranslation();

	return (
		<div className="px-2">
			<h1 className="text-3xl max-md:text-xl text-center mb-2">{t("music:duration.title")}</h1>
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

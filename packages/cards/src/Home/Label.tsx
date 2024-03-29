import type React from "react";
import useTranslation from "next-translate/useTranslation";

export interface LabelProps {
	type: keyof typeof LabelTypes;
}

const LabelTypes = {
	image: "fa-solid fa-image",
	video: "fa-solid fa-video",
	music: "fa-solid fa-music"
};

export const Label: React.FC<LabelProps> = ({ type }) => {
	const labelIcon = LabelTypes[type];
	const { t } = useTranslation();

	return (
		<div className="bg-tertiary py-2 px-4 rounded-lg w-fit h-fit flex gap-2 items-center text-lg absolute top-2 right-2">
			<i className={labelIcon} /> <p className="capitalize">{t(`common:content_types.${type}`)}</p>
		</div>
	);
};

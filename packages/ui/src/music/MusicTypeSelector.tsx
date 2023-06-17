import { SecondaryButton } from "@creatorhub/buttons";
import { useMusicTags } from "@creatorhub/hooks";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface Props {
	/** Set state action for setting the content type */
	setType: React.Dispatch<string>;
}

export const MusicTypeSelector: React.FC<Props> = ({ setType }) => {
	const tags = useMusicTags();
	const { t } = useTranslation();

	return (
		<div className="px-2">
			<h1 className="text-3xl max-md:text-xl text-center mb-2">{t("music:type.title")}</h1>
			<div className="flex items-center justify-center flex-wrap gap-4">
				{tags.map((tag) => (
					<SecondaryButton key={tag.id} type="button" className="text-lg" onClick={() => setType(tag.id)}>
						{tag.name}
					</SecondaryButton>
				))}
			</div>
		</div>
	);
};

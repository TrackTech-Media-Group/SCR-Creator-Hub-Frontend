import { SecondaryButton, TransparentButton } from "@creatorhub/buttons";
import { Modal } from "@creatorhub/modal";
import useTranslation from "next-translate/useTranslation";
import type React from "react";

interface Props {
	isOpen: boolean;
	onClick: () => void;
	toast: (str: string) => void;
}

export const AttributionModal: React.FC<Props> = (props) => {
	const { t } = useTranslation();
	const contributionText = t("common:modals.contribution.contribution_text");
	const copyText = (text: string) => {
		void navigator.clipboard.writeText(text);
		props.toast("Copied to clipboard!");
	};

	return (
		<Modal {...props}>
			<div className="max-w-[675px]">
				<h1 className="text-3xl leading-10 my-4">{t("common:modals.contribution.title")}</h1>
				<p className="text-base">{t("common:modals.contribution.description")}</p>
			</div>
			<div className="max-w-[675px]">
				<div className="mt-4">
					<h3 className="text-lg capitalize">{t("common:modals.contribution.description_title")}</h3>
					<div className="bg-grey p-2 rounded-xl relative mt-1">
						<p className="text-base pr-12">{contributionText}</p>
						<TransparentButton type="button" className="absolute top-0 right-0" onClick={() => copyText(contributionText)}>
							<i className="fa-solid fa-copy" />
						</TransparentButton>
					</div>
				</div>
				<p className="text-sm">{t("common:modals.contribution.disclaimer")}</p>
			</div>
			<div className="max-w-[675px] flex items-center justify-center mt-4">
				<SecondaryButton type="button" onClick={props.onClick} className="!bg-[#6F7FFF] hover:!bg-[#6F7FFF50] capitalize">
					{t("common:buttons.understood")}
				</SecondaryButton>
			</div>
		</Modal>
	);
};

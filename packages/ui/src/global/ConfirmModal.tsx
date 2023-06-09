import { DangerButton } from "@creatorhub/buttons";
import { Modal } from "@creatorhub/modal";
import useTranslation from "next-translate/useTranslation";
import type React from "react";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

interface Props {
	isOpen: boolean;

	cancel: () => void;
	confirm: () => void;
}

export const ConfirmModal: React.FC<Props> = ({ isOpen, cancel, confirm }) => {
	const { t } = useTranslation();

	const [clicked, setClicked] = useState(false);
	useEffect(() => setClicked(false), [isOpen]);

	const onClickEvent = () => {
		setClicked(true);
		confirm();
	};

	return (
		<Modal isOpen={isOpen} onClick={cancel}>
			<div className="flex flex-col gap-8 items-center justify-center">
				<div className="max-w-[40vw] max-xl:max-w-[75vw] max-md:max-w-[100vw]">
					<h1 className="text-3xl text-center">{t("common:modals.confirm.title")}</h1>
					<p className="text-base text-center">{t("common:modals.confirm.description")}</p>
				</div>
				<div className="w-full grid place-items-center">
					<DangerButton type="button" onClick={onClickEvent} disabled={clicked} className="w-full capitalize">
						{clicked ? <PulseLoader size={15} color="#fff" /> : t("common:buttons.continue")}
					</DangerButton>
				</div>
			</div>
		</Modal>
	);
};

import { SecondaryButton, TransparentButton } from "@creatorhub/buttons";
import useTranslation from "next-translate/useTranslation";
import type React from "react";

interface Props {
	closeMenu: () => void;
	active: boolean;
}

export const HomeMobileMenu: React.FC<Props> = ({ active, closeMenu }) => {
	const { t } = useTranslation();

	return (
		<div className={`bg-main w-screen h-screen z-10 left-0 top-0 ${active ? "fixed" : "hidden"}`}>
			<div className="absolute top-20 flex flex-col px-4 w-full gap-4">
				<div>
					<h1 className="text-xl font-bold capitalize">{t("common:navigation.products")}</h1>
					<div className="flex flex-col gap-2 pl-2">
						<TransparentButton type="link" href="/video" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center capitalize">
								<i className="fa-solid fa-film" /> {t("common:content_types.video")}
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/image" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center capitalize">
								<i className="fa-solid fa-image" /> {t("common:navigation.image")}
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/music" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center capitalize">
								<i className="fa-solid fa-music" /> {t("common:content_types.music")}
							</p>
						</TransparentButton>
					</div>
				</div>
				<div>
					<h1 className="text-xl font-bold capitalize">{t("common:navigation.resources")}</h1>
					<div className="flex flex-col gap-2 pl-2">
						<TransparentButton type="link" href="/about" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center capitalize">
								<i className="fa-solid fa-building" /> {t("common:navigation.about")}
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/support" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center capitalize">
								<i className="fa-solid fa-question" /> {t("common:navigation.support")}
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/tos" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center capitalize">
								<i className="fa-solid fa-book" /> {t("common:navigation.tos")}
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/privacy" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center capitalize">
								<i className="fa-solid fa-fingerprint" /> {t("common:navigation.privacy")}
							</p>
						</TransparentButton>
					</div>
				</div>
				<SecondaryButton type="link" href="/login" onClick={closeMenu}>
					<p className="w-full flex gap-4 justify-center items-center">
						{t("common:buttons.sign_in")} <i className="fa-solid fa-arrow-right-long" />
					</p>
				</SecondaryButton>
			</div>
		</div>
	);
};

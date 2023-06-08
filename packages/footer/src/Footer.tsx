import { TransparentButton } from "@creatorhub/buttons";
import type React from "react";
import useTranslation from "next-translate/useTranslation";

export const Footer: React.FC = () => {
	const { t } = useTranslation();

	return (
		<footer className="bg-black w-full flex flex-col justify-center items-center p-8 gap-y-8 relative min-h-[16rem]">
			<div className="flex justify-between w-[32rem] max-sm:flex-col max-sm:w-auto max-sm:gap-y-4 max-sm:items-center max-sm:text-center">
				<div>
					<h1 className="text-lg capitalize">{t("common:navigation.products")}</h1>
					<div className="flex flex-col">
						<TransparentButton type="link" href="/video" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:content_types.video")}
						</TransparentButton>
						<TransparentButton type="link" href="/image" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:navigation.image")}
						</TransparentButton>
						<TransparentButton type="link" href="/music" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:content_types.music")}
						</TransparentButton>
					</div>
				</div>
				<div>
					<h1 className="text-lg capitalize">{t("common:navigation.company")}</h1>
					<div className="flex flex-col">
						<TransparentButton type="link" href="/tos" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:navigation.tos")}
						</TransparentButton>
						<TransparentButton type="link" href="/privacy" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:navigation.privacy")}
						</TransparentButton>
						<TransparentButton type="link" href="/license" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:navigation.image_license")}
						</TransparentButton>
						<TransparentButton type="link" href="/about" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:navigation.about")}
						</TransparentButton>
					</div>
				</div>
				<div>
					<h1 className="text-lg capitalize">{t("common:navigation.support")}</h1>
					<div className="flex flex-col">
						<TransparentButton type="link" href="/support/contact" className="!p-0 text-white-400 hover:text-white-600 capitalize">
							{t("common:navigation.contact")}
						</TransparentButton>
						<TransparentButton type="link" href="/support/faq" className="!p-0 text-white-400 hover:text-white-600">
							FAQ
						</TransparentButton>
					</div>
				</div>
			</div>
			<div className="absolute right-8 bottom-8 flex flex-col justify-center items-center max-lg:static">
				<img className="w-56" src="/logo/logo_with_text.png" alt="Creator Hub logo" />
				<img className="w-48" src="/logo/track-tech.png" alt="Track Tech logo" />
				<p className="text-sm text-center">© TrackTech Media Group 2023</p>
			</div>
		</footer>
	);
};

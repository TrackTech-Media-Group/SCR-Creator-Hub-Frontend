import { TransparentButton, WhiteButton } from "@creatorhub/buttons";
import React, { useState } from "react";
import { BaseNavbar } from "./BaseNavbar";
import useTranslation from "next-translate/useTranslation";

export const UserNavbar: React.FC = () => {
	const { t } = useTranslation();
	const [menu, setMenu] = useState(false);
	const toggleMenu = () => setMenu(!menu);

	return (
		<BaseNavbar logoHref="/image">
			<div className="flex items-center gap-6">
				<TransparentButton type="link" href="/image" className="max-sm:hidden capitalize">
					{t("common:navigation.image")}
				</TransparentButton>
				<TransparentButton type="link" href="/video" className="max-sm:hidden capitalize">
					{t("common:content_types.video")}
				</TransparentButton>
				<TransparentButton type="link" href="/music" className="max-sm:hidden capitalize">
					{t("common:content_types.music")}
				</TransparentButton>
				<div className="relative">
					<WhiteButton type="button" className="rounded-full h-fit" onClick={toggleMenu}>
						<i className="fa-solid fa-user" />
					</WhiteButton>
					<div className={`${menu ? "absolute" : "hidden"} z-10 right-0 translate-y-2 bg-gray-700 flex flex-col rounded-md`}>
						<div className="flex flex-col gap-y-0">
							<TransparentButton
								type="link"
								href="/image"
								className="max-sm:block sm:hidden !py-0 capitalize"
								onClick={() => setMenu(false)}
							>
								{t("common:navigation.image")}
							</TransparentButton>
							<TransparentButton
								type="link"
								href="/video"
								className="max-sm:block sm:hidden !py-0 capitalize"
								onClick={() => setMenu(false)}
							>
								{t("common:content_types.video")}
							</TransparentButton>
							<TransparentButton
								type="link"
								href="/music"
								className="max-sm:block sm:hidden !py-0 capitalize"
								onClick={() => setMenu(false)}
							>
								{t("common:content_types.music")}
							</TransparentButton>
						</div>
						<div className="bg-gray-700 w-full h-[2px] my-2 max-sm:block sm:hidden" />
						<div className="flex flex-col gap-y-0">
							<TransparentButton type="link" href="/profile" className="!py-0" onClick={() => setMenu(false)}>
								<p className="capitalize">{t("common:navigation.profile")}</p>
							</TransparentButton>
							<TransparentButton type="link" href="/logout" className="!py-0" onClick={() => setMenu(false)}>
								<p className="capitalize">{t("common:buttons.logout")}</p>
							</TransparentButton>
						</div>
					</div>
				</div>
			</div>
		</BaseNavbar>
	);
};

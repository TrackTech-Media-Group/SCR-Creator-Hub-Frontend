import { Navbar } from "@creatorhub/navbar";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { PrimaryButton } from "@creatorhub/buttons";

const NotFoundPage: NextPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<Navbar />
			<NextSeo defaultTitle={t("error:title")} />
			<div className="mx-auto max-w-lg min-h-screen flex flex-col place-content-center place-items-center gap-8 px-8 py-16 lg:px-6 lg:py-0">
				<h1 className="flex items-center gap-2 font-semibold leading-none text-[12rem] max-md:hidden">500</h1>
				<h1 className="md:hidden text-[96px] flex items-center gap-2 font-semibold leading-none">500</h1>
				<h2 className="text-9 md:text-[52px]">{t("error:text")}</h2>
				<div className="flex items-center gap-2">
					<PrimaryButton type="link" href="/">
						{t("notfound:button")}
					</PrimaryButton>
					<PrimaryButton type="link" href="/status">
						{t("notfound:status")}
					</PrimaryButton>
				</div>
			</div>
		</>
	);
};

export default NotFoundPage;

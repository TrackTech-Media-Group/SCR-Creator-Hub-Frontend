import { Navbar } from "@creatorhub/navbar";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ABOUT_US_USERS } from "../lib/constants";

const BreakComponent: React.FC = () => (
	<>
		<br />
		<br />
	</>
);

const AboutPage: NextPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<Navbar />
			<NextSeo title={t("about:title")} description={t("about:description").replace("<0 />", "")} />
			<div className="px-32 pt-40 max-lg:p-16 max-md:px-4 min-h-screen flex flex-col justify-center items-center">
				<div className="max-w-[920px] px-4 flex flex-col gap-32 max-lg:max-w-full">
					<div className="flex flex-col gap-2 justify-center">
						<h1 className="text-title">{t("about:title")}</h1>
						<p className="text-base">
							<Trans i18nKey="about:description" components={[<BreakComponent key="0" />]} />
						</p>
					</div>
					<div className="mb-8">
						<h1 className="text-xl mb-8">{t("about:team.title")}</h1>
						<div className="flex flex-col gap-16 justify-center">
							{ABOUT_US_USERS.map((user, idx) => (
								<div key={idx} className="flex items-center gap-12 w-full max-md:flex-col">
									<img src={user.image} alt={`${user.name}: profile picture`} className="rounded-full w-80 max-lg:w-64" />
									<div className="max-w-[550px]">
										<div className="text-xl">
											<h1 className="font-bold">{user.name}</h1>
											<h2 className="font-medium -mt-2">{t(`about:team.${idx}.role`)}</h2>
										</div>
										<div role="article" className="text-base flex flex-col gap-3">
											<Trans i18nKey={`about:team.${idx}.description`} components={[<BreakComponent key="0" />]} />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutPage;

import type React from "react";
import { HomeNavbar } from "@creatorhub/navbar";
import { SecondaryButton } from "@creatorhub/buttons";
import Marquee from "react-fast-marquee";
import { HomeCard } from "@creatorhub/cards";
import axios from "axios";
import { Content } from "../lib/types";
import { LANDING_REASON_KEYS } from "../lib/constants";
import { serverSidePropsWithLogin } from "../lib/utils";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { NextSeo } from "next-seo";

/**
 * Fetches preview content from the api
 */
async function getPreviewContent(): Promise<Content[]> {
	const { data: content } = await axios
		.get<Content[]>(`${process.env.API_URL}/v1/home`, {
			headers: { Authorization: `Bearer ${process.env.INTERNAL_API_KEY}` }
		})
		.catch(() => ({ data: [] }));

	return content;
}

export const getServerSideProps = serverSidePropsWithLogin(async () => {
	const content = await getPreviewContent();
	return {
		props: { content }
	};
});

interface Props {
	content: Content[];
}

const Page: React.FC<Props> = ({ content }) => {
	const { t } = useTranslation();
	const marqueeData = t("landing:marquee", undefined, { returnObjects: true }) as string[];

	return (
		<>
			<HomeNavbar />
			<NextSeo title={t(`common:branding.slogan`)} openGraph={{ title: "SCR Creator Hub" }} />
			<div className="px-32 max-md:px-4 min-h-screen bg-home_header bg-no-repeat bg-[right_top] max-lg:bg-home_header_lg max-md:bg-home_header_md flex flex-col justify-center items-center">
				<div className="py-[232px] flex flex-col gap-20 max-md:py-[146px] mr-auto">
					<div>
						<h1 className="text-title max-md:text-subtitle max-md:!font-bold">SCR Creators,</h1>
						<h2 className="text-subtitle max-md:text-4xl">{t("landing:hero-section.welcome")}</h2>
					</div>
					<div className="flex flex-col gap-7">
						<h2 className="text-subtitle max-w-xl max-md:text-4xl">
							<Trans
								i18nKey="landing:hero-section.subtitle"
								components={[<strong key="0" className="text-highlight font-semibold" />]}
							/>
						</h2>
						<SecondaryButton type="link" href="/login" className="w-fit">
							{t("landing:hero-section.button")}
						</SecondaryButton>
					</div>
				</div>
				<div className="mt-24 flex flex-col justify-center items-center gap-8">
					<h1 className="text-3xl w-fit">{t("landing:explore_title")}</h1>
					<div className="flex flex-wrap gap-4 justify-center">
						{content.map((content, key) => (
							<HomeCard
								key={key}
								type={content.type}
								alt={content.name}
								src={content.preview}
								href={`/${content.type}/${content.id}`}
							/>
						))}
					</div>
				</div>
				<div className="w-[calc(100vw-1.1rem)] overflow-hidden my-48">
					{(["left", "right"] as const).map((direction) => (
						<Marquee key={direction} className="h-28 overflow-hidden" autoFill gradient={false} direction={direction}>
							{marqueeData.map((str, key) => (
								<p className="text-8xl font-semibold mx-8" key={key}>
									{str}
								</p>
							))}
						</Marquee>
					))}
				</div>
				<div className="max-w-[68rem] flex flex-col justify-center items-center">
					<h1 className="text-3xl w-fit mb-4">{t("landing:reasons.title")}</h1>
					<ul className="columns-2 max-lg:columns-1">
						{LANDING_REASON_KEYS.map((key, idx) => (
							<li key={idx} className="max-w-[32rem] flex justify-between items-center gap-8 odd:mb-4">
								<i className={`${key} text-title`} />
								<div>
									<h1 className="text-xl">{t(`landing:reasons.${idx}.title`)}</h1>
									<p className="text-base">{t(`landing:reasons.${idx}.description`)}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className="w-full my-24">
					<div className="w-full absolute left-0 overflow-hidden grid place-items-center">
						<img className="min-h-[38rem] w-fit object-cover" src="/backgrounds/home_conclusion_image.png" alt="conclusion background" />
					</div>
					<div className="mt-[38rem] flex flex-col justify-center items-center">
						<h1 className="text-3xl text-center leading-10 mb-4">{t("landing:conclusion.title")}</h1>
						<p className="text-base max-w-[38rem] text-center">{t("landing:conclusion.description")}</p>
						<SecondaryButton type="link" href="/login" className="rounded-full mt-8">
							{t("common:buttons.sign_in")} <i className="fa-solid fa-arrow-right-long ml-4" />
						</SecondaryButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;

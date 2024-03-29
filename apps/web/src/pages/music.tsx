import { Navbar } from "@creatorhub/navbar";
import { MusicDurationSelector, MusicTypeSelector, MusicResults } from "@creatorhub/ui";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useState } from "react";

const getSingle = (x: string | string[] | undefined) => (Array.isArray(x) ? x[0] : x);

interface Props {
	duration: string | undefined;
	type: string | undefined;
}

const MusicPage: NextPage<Props> = ({ type: _type, duration: _duration }) => {
	const { t } = useTranslation();
	const router = useRouter();
	const [type, setType] = useState<string | undefined>(_type);
	const [duration, setDuration] = useState<string | undefined>(_duration);

	const typeSelector = (type: string) => {
		setType(type);
		void router.push({ query: { type } });
	};

	const durationSelector = (duration: string) => {
		setDuration(duration);
		void router.push({ query: { duration, type } });
	};

	const goBack = () => {
		if (duration) {
			setDuration(undefined);
			void router.push({ query: { type } });
		} else {
			setType(undefined);
			void router.push({ query: {} });
		}
	};

	return (
		<main className="min-h-screen grid place-items-center bg-[url(/backgrounds/profile.svg)] bg-cover py-24 px-10 max-md:px-0">
			<Navbar />
			<NextSeo title={t("music:title")} />
			{duration ? (
				<MusicResults duration={duration} type={type!} goBackFunction={goBack} />
			) : type ? (
				<MusicDurationSelector type={type} setDuration={durationSelector} goBackFunction={goBack} />
			) : (
				<MusicTypeSelector setType={typeSelector} />
			)}
		</main>
	);
};

MusicPage.getInitialProps = (ctx) => {
	const { type, duration } = ctx.query;
	return { type: getSingle(type), duration: getSingle(duration) };
};

export default MusicPage;

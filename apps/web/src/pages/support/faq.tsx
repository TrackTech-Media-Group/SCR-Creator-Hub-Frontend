import { Navbar } from "@creatorhub/navbar";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FaqItem as iFaqItem, FaqQuery } from "@creatorhub/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const FaqItem: React.FC<iFaqItem & { index: number }> = ({ question, answer, index }) => {
	const [opened, setOpened] = useState(false);
	const copyUrl = () => {
		const url = new URL(location.href);
		url.hash = `#faq-${index}`;
		void navigator.clipboard.writeText(url.toString());
	};

	return (
		<li className="p-4 bg-secondary rounded-md relative mb-2 last:mb-0" role="button" onClick={() => setOpened(!opened)}>
			<i
				className="fa-solid fa-chevron-up absolute right-4 top-4.5 text-[1.5rem] transition-all duration-300"
				style={{ transform: `rotate(${opened ? "0deg" : "180deg"})` }}
			/>
			<h2 id={`faq-${index}`} className="text-base leading-6 font-semibold pr-8 flex items-center gap-2">
				<button about="Copy url" onClick={copyUrl}>
					<i className="fa-solid fa-link text-sm hover:text-white-400 focus:text-white-400" />
				</button>
				{question}
			</h2>
			{opened && (
				<ReactMarkdown
					className="mt-2 leading-5"
					remarkPlugins={[[remarkGfm]]}
					linkTarget="_blank"
					components={{ a: (props) => <a {...props} className="text-white-400 hover:text-white-600 focus:text-white-600" /> }}
				>
					{answer}
				</ReactMarkdown>
			)}
		</li>
	);
};

const FaqPage: NextPage = () => {
	const { t } = useTranslation();
	const faqItems = t("faq:items", FaqQuery, { returnObjects: true }) as iFaqItem[];

	return (
		<main className="mt-16 min-h-screen grid place-items-center">
			<Navbar />
			<NextSeo title={t("faq:title")} />
			<div className="px-2">
				<h1 className="text-[3rem] font-bold max-md:text-[2rem] text-center">{t("faq:title")}</h1>
				<ul className="max-w-[650px] w-full max-md:max-w-[432px]">
					{faqItems.map((faq, key) => (
						<FaqItem {...faq} index={key} key={key} />
					))}
				</ul>
			</div>
		</main>
	);
};

export default FaqPage;

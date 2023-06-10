import { LanguageExceptionFlags } from "@creatorhub/utils";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";

interface LanguageValueProps {
	icon: string;
	language: string;
}

export interface SelectOption {
	label: any;
	value: any;
}

const LanguageValue: React.FC<LanguageValueProps> = ({ language, icon }) => {
	return (
		<p aria-label={language} className="flex items-center">
			<img className="rounded-sm mr-3" width={32} height={32} src={icon} alt={language} />
			{language}
		</p>
	);
};

export const useLanguage = () => {
	const { locales, locale, route, asPath, push } = useRouter();
	const [, setCookie] = useCookies(["NEXT_LOCALE"]);

	const currentLocale = locale ?? "en";
	const supportedLocales = locales ?? ["en"];

	const flag = (language: string) => LanguageExceptionFlags[language] || `https://flagcdn.com/${language}.svg`;

	const languages = new Intl.DisplayNames(currentLocale, { type: "language" });
	const options = supportedLocales.map<SelectOption>((lang) => ({
		label: <LanguageValue icon={flag(lang)} language={languages.of(lang) ?? lang} />,
		value: lang
	}));

	const [selectedLanguage, setSelectedLanguage] = useState<SelectOption>({
		label: <LanguageValue icon={flag(currentLocale)} language={languages.of(currentLocale) ?? currentLocale} />,
		value: currentLocale
	});

	const onSelectChange = (option: SelectOption | null) => {
		if (!option) return;

		setSelectedLanguage(option);
		setCookie("NEXT_LOCALE", option.value, { path: "/" });
		void push(route, asPath, { locale: option.value });
	};

	useEffect(() => {
		setSelectedLanguage({
			label: <LanguageValue icon={flag(currentLocale)} language={languages.of(currentLocale) ?? currentLocale} />,
			value: currentLocale
		});
	}, [currentLocale]);

	return {
		options,
		selectedLanguage,
		onSelectChange
	};
};

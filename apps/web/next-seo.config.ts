import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
	openGraph: {
		type: "website",
		locale: "en_IE",
		url: "https://scrcreate.app/",
		siteName: "SCR Creator Hub"
	},
	defaultTitle: "SCR Creator Hub",
	themeColor: "#060922",
	description: "The future of SCR Content Creation",
	titleTemplate: "%s • SCR Creator Hub",
	twitter: { site: "SCR Creator Hub" }
};

export default config;

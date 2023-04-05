import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
	openGraph: {
		type: "website",
		locale: "en_IE",
		url: "https://scrcreate.app/",
		images: [
			{
				url: "https://scrcreate.app/logo/logo.png",
				alt: "SCR Creator Hub logo"
			}
		]
	},
	defaultTitle: "SCR Creator Hub",
	themeColor: "#060922",
	description: "The future of SCR Content Creation",
	titleTemplate: "%s • SCR Creator Hub",
	dangerouslySetAllPagesToNoFollow: false,
	dangerouslySetAllPagesToNoIndex: false,
	twitter: { cardType: "summary" }
};

export default config;

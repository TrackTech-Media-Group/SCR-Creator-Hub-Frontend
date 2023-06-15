import type { DefaultSeoProps } from "next-seo";

const config = {
	openGraph: {
		type: "website",
		locale: "en_IE",
		url: "https://scrcreate.app/",
		images: [
			{
				url: "/banner.png",
				alt: "SCR Creator Hub banner"
			}
		]
	},
	defaultTitle: "SCR Creator Hub",
	themeColor: "#060922",
	description: "The future of SCR Content Creation",
	titleTemplate: "%s • SCR Creator Hub",
	dangerouslySetAllPagesToNoFollow: false,
	dangerouslySetAllPagesToNoIndex: false,
	twitter: { cardType: "summary_large_image" }
} satisfies DefaultSeoProps;

export default config;

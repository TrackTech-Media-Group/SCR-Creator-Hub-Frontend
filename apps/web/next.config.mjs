import nextTranslate from "next-translate-plugin";
const transpilePackages = ["buttons", "cards", "footer", "modal", "navbar", "swr", "ui"];

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: false,
	transpilePackages: transpilePackages.map((pkg) => `@creatorhub/${pkg}`),
	images: {
		domains: ["cdn.scrcreate.app", "creatorhub-cdn-dev.dnkl.xyz"]
	},
	redirects: () => [
		{
			source: "/tos",
			destination: "/tos.pdf",
			permanent: true
		},
		{
			source: "/privacy",
			destination: "/privacy-policy.pdf",
			permanent: true
		},
		{
			source: "/license",
			destination: "/image-license.pdf",
			permanent: true
		},
		{
			source: "/support/contact",
			destination: "https://discord.scrcreate.app/",
			permanent: true
		},
		{
			source: "/support/faq",
			destination: "https://discord.scrcreate.app/",
			permanent: false
		}
	],
	env: {
		PASSWORD_PROTECT: false,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "https://beta-api.scrcreate.app"
	}
};

export default nextTranslate(config);

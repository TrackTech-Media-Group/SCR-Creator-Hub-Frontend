import { readdirSync } from "node:fs";
import { join } from "node:path";

const transpilePackages = readdirSync(join("..", "..", "packages"));

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: false,
	transpilePackages,
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
	i18n: {
		defaultLocale: "en",
		locales: ["en"]
	},
	env: {
		PASSWORD_PROTECT: false,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "https://beta-api.scrcreate.app"
	}
};

export default config;

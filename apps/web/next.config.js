/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync } = require("node:fs");
const { join } = require("node:path");
const packages = readdirSync(join("..", "..", "packages"));

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	transpilePackages: packages,
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

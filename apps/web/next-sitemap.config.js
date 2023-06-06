/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://scrcreate.app",
	generateRobotsTxt: true,
	exclude: ["/admin", "/callback", "/api/*"]
};

export default config;

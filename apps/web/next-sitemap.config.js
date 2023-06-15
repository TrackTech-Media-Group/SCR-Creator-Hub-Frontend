/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://scrcreate.app",
	generateRobotsTxt: true,
	exclude: ["/admin", "/admin/*", "/api/*", "/login", "/logout"]
};

export default config;

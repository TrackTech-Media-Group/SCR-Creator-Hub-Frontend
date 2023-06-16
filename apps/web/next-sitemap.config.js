/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://scrcreate.app",
	exclude: ["/admin", "/admin/*", "/api/*", "/login", "/logout", "/500", "/400"],
	generateRobotsTxt: true,
	robotsTxtOptions: {
		additionalSitemaps: ["https://api.scrcreate.app/sitemap.xml"]
	}
};

export default config;

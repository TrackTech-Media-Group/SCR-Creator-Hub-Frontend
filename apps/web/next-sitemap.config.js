/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://scrcreate.app",
	exclude: ["/admin", "/admin/*", "/api/*", "/login", "/logout", "/500", "/400"],
	transform: (config, url) => {
		const high = ["/", "/image", "/video", "/music"].some((str) => url.endsWith(str)); // 1.0;
		const medium = ["/about", "/search"].some((str) => url.endsWith(str)); // 0.7;
		const low = ["/support/faq", "/profile"].some((str) => url.endsWith(str)); // 0.3;

		return { loc: url, changefreq: "daily", priority: high ? 1.0 : medium ? 0.7 : low ? 0.3 : 0.2 };
	},
	generateRobotsTxt: true,
	robotsTxtOptions: {
		additionalSitemaps: ["https://api.scrcreate.app/sitemap.xml"]
	}
};

export default config;

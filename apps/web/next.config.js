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
	env: {
		PASSWORD_PROTECT: process.env.NODE_ENV === "production",
		NEXT_PUBLIC_API_URL: "https://beta-api.scrcreate.app"
	}
};

/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync } = require("node:fs");
const { join } = require("node:path");
const packages = readdirSync(join("..", "..", "packages"));

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	transpilePackages: packages,
	env: {
		PASSWORD_PROTECT: process.env.NODE_ENV === "production"
	}
};

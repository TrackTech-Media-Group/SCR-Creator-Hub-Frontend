import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url.js";

const defaultLocale = "en";
const locales = ["nl", "en"];

export function middleware(request: NextRequest): NextResponse | undefined {
	const { pathname } = request.nextUrl;
	if (pathname.startsWith("/_next") || pathname.includes("/api/") || /\.(.*)$/.test(pathname)) return;

	if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`)
		return NextResponse.redirect(new URL(pathname.replace(`/${defaultLocale}`, pathname === `/${defaultLocale}` ? "/" : ""), request.url));

	const pathnameIsMissingLocale = locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
	if (pathnameIsMissingLocale) {
		const url = new NextURL(`/${defaultLocale}${pathname}`, request.url);
		return NextResponse.rewrite(url);
	}

	return undefined;
}

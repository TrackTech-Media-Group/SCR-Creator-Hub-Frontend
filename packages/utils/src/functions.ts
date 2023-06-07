import axios, { HttpStatusCode } from "axios";
import { getCookie } from "cookies-next";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { CsrfToken } from "./types";

/**
 * Checks whether or not the user has a session cookie and returns a boolean value depending on this result
 * @param ctx The server-side context that contains the request and response object
 */
export const isLoggedIn = (ctx: GetServerSidePropsContext): boolean => {
	const cookie = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	return Boolean(cookie);
};

/**
 * GetServerSideProps function wrapper which redirects users to /images if logged in
 * @param fn The getServerSideProps function to wrap
 */
export const serverSidePropsWithCookieLogin = (fn: GetServerSideProps) => {
	return (ctx: GetServerSidePropsContext) => {
		if (isLoggedIn(ctx)) return { redirect: { destination: "/images", statusCode: HttpStatusCode.TemporaryRedirect } };
		return fn(ctx);
	};
};

/**
 * Returns a valid CSRF-Token which can be used to make post requests
 * @param session The user session
 */
export const getCsrfToken = async (session: string) => {
	const csrf = await axios.post<CsrfToken>(`${process.env.API_URL}/v1/user/state`, undefined, {
		headers: { Authorization: `User ${session}` }
	});

	return csrf.data;
};

/**
 * Verifies whether or not a session exists
 * @param session The user session
 */
export const verifySession = async (session: string) => {
	const sessionVerification = await axios.post<boolean>(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/verify`, undefined, {
		headers: { Authorization: `User ${session}` }
	});

	return sessionVerification.data;
};

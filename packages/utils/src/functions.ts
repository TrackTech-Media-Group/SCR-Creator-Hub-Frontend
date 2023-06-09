import axios, { HttpStatusCode } from "axios";
import { deleteCookie, getCookie, setCookie as SetCookieNext } from "cookies-next";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { CsrfToken, Oauth2Data, User } from "./types";
import type { OptionsType as CookiesNextOptions } from "cookies-next/lib/types";
import { HTTP_REGEX } from "./regex";

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
 */
export const getCsrfToken = async () => {
	const csrf = await axios.get<CsrfToken>(`${process.env.API_URL}/v1/auth/csrf`, {
		headers: { Authorization: `Bearer: ${process.env.INTERNAL_API_KEY}` }
	});
	return csrf.data;
};

/**
 * Returns a valid CSRF-Token and oauth2 url which can be used for the oauth2 flow
 */
export const getOauth2 = async () => {
	const csrf = await axios.get<Oauth2Data>(`${process.env.API_URL}/v1/auth/login`, {
		headers: { Authorization: `Bearer ${process.env.INTERNAL_API_KEY}` }
	});

	return csrf.data;
};

/**
 * Sends all the oauth2 data to the back-end server
 * @param code The oauth2 code from Discord
 * @param state The state value from the oauth2 flow
 * @param stateToken The state token from the cookies
 */
export const handleOauth2Request = async (code: string, state: string, stateToken: string) => {
	const oauth2 = await axios.post<string>(
		`${process.env.API_URL}/v1/auth/callback`,
		{ code, state, stateToken },
		{
			headers: { Authorization: `Bearer ${process.env.INTERNAL_API_KEY}` }
		}
	);

	return oauth2.data;
};

/**
 * Destroys an user session
 * @param session The user session to destroy
 */
export const handleLogout = async (session: string) => {
	await axios.delete(`${process.env.API_URL}/v1/auth/logout`, {
		headers: { Authorization: `User ${session}` }
	});
};

/**
 * Verifies whether or not a session exists
 * @param session The user session
 */
export const verifySession = async (session: string) => {
	const sessionVerification = await axios.get<boolean>(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/verify`, {
		headers: { Authorization: `User ${session}` }
	});

	return sessionVerification.data;
};

/**
 * Returns the user object from the API
 */
export const getUser = async () => {
	const session = getCookie("CH-SESSION");
	const userData = await axios.get<User>(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/@me`, {
		headers: { Authorization: `User ${session}` }
	});

	return userData.data;
};

/**
 * Deletes the user from the server
 * @param csrf The CSRF-TOKEN which is required to make this request
 */
export const destoryUser = async (csrf: string) => {
	const session = getCookie("CH-SESSION");
	await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/@me`, {
		headers: { Authorization: `User ${session}`, "XSRF-TOKEN": csrf },
		withCredentials: true
	});

	deleteCookie("CH-SESSION");
};

/**
 * Deletes all the user sessions from the server
 * @param csrf The CSRF-TOKEN which is required to make this request
 */
export const destorySessions = async (csrf: string) => {
	const session = getCookie("CH-SESSION");
	await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/sessions`, {
		headers: { Authorization: `User ${session}`, "XSRF-TOKEN": csrf },
		withCredentials: true
	});

	deleteCookie("CH-SESSION");
};

export const setCookie = (key: string, value: any, options?: CookiesNextOptions) => {
	const [ext, domainName] = process.env.API_URL!.replace(HTTP_REGEX, "").split(".").reverse();
	const domain = process.env.NODE_ENV === "development" ? undefined : `.${domainName}.${ext}`;

	SetCookieNext(key, value, { ...options, domain });
};

export const parseQuery = (query: string | string[] | undefined) => {
	return typeof query === "string" ? query : query?.[0];
};

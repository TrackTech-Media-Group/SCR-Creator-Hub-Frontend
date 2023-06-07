import { HttpStatusCode } from "axios";
import { getCookie } from "cookies-next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

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
export const serverSidePropsWithLogin = (fn: GetServerSideProps) => {
	return (ctx: GetServerSidePropsContext) => {
		if (isLoggedIn(ctx)) return { redirect: { destination: "/images", statusCode: HttpStatusCode.TemporaryRedirect } };
		return fn(ctx);
	};
};

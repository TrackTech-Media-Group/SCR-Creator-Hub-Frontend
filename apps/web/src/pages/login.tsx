import type { GetServerSideProps } from "next";
import { getOauth2, setCookie } from "@creatorhub/utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { return: _return } = ctx.query;
	const returnPath = Array.isArray(_return) ? _return[0] : _return;
	if (returnPath) setCookie("LOGIN_RETURN_PATH", returnPath, { req: ctx.req, res: ctx.res });

	const data = await getOauth2();
	setCookie("XSRF-STATE-TOKEN", data.cookie, {
		req: ctx.req,
		res: ctx.res
	});

	return {
		redirect: {
			permanent: true,
			destination: data.url
		}
	};
};

const Login = () => <div></div>;
export default Login;

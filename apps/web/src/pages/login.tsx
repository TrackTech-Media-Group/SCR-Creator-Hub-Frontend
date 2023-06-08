import type { GetServerSideProps } from "next";
import { getOauth2, setCookie } from "@creatorhub/utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

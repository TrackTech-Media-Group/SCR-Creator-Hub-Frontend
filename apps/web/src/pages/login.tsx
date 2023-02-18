import type { GetServerSideProps } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/auth/csrf`);
	setCookie("XSRF-STATE-TOKEN", csrf.data.token, { req: ctx.req, res: ctx.res });

	return {
		redirect: {
			permanent: true,
			destination: `${process.env.DISCORD_OAUTH2_URL}&state=${csrf.data.state}`
		}
	};
};

const Login = () => {
	return <div></div>;
};

export default Login;

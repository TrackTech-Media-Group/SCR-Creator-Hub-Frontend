import type { GetServerSideProps } from "next";
import axios from "axios";
import { getCookie } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {},
			redirect: {
				permanent: true,
				destination: "/"
			}
		};

	await axios.post<{ state: string; token: string }>(`${apiUrl}/user/logout`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});

	return {
		redirect: {
			permanent: true,
			destination: "/"
		}
	};
};

const Logout = () => {
	return <div></div>;
};

export default Logout;

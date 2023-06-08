import type { GetServerSideProps } from "next";
import { deleteCookie, getCookie } from "cookies-next";
import { handleLogout } from "@creatorhub/utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			redirect: {
				permanent: true,
				destination: "/"
			}
		};

	await handleLogout(userSession.toString());
	deleteCookie("CH-SESSION", { req: ctx.req, res: ctx.res });

	return {
		redirect: {
			permanent: true,
			destination: "/"
		}
	};
};

const Logout = () => <div></div>;
export default Logout;

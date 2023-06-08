import { handleOauth2Request, setCookie } from "@creatorhub/utils";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

const getValuesFromQuery = (query: NextApiRequest["query"]) => {
	const { code: _code, state: _state } = query;
	const code = Array.isArray(_code) ? _code[0] : _code || null;
	const state = Array.isArray(_state) ? _state[0] : _state || null;

	return {
		code,
		state
	};
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { code, state } = getValuesFromQuery(req.query);
	if (!code || !state) throw new Error("Missing state or code in query");

	const stateToken = getCookie("XSRF-STATE-TOKEN", { req, res });
	if (!stateToken) throw new Error("Missing XRSF-STATE-TOKEN in cookies");

	const cookie = await handleOauth2Request(code, state, stateToken.toString());
	setCookie("CH-SESSION", cookie, { req, res });
	res.redirect("/users/@me");
}

import { passwordCheckHandler } from "next-password-protect";

export default passwordCheckHandler(process.env.PASSWORD ?? "", {
	cookieName: "creator_hub_preview"
});

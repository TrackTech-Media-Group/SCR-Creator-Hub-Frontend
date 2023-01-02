import { loginHandler } from "next-password-protect";

export default loginHandler(process.env.PASSWORD ?? "", {
	cookieName: "creator_hub_preview"
});

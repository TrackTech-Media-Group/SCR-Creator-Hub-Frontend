import "../styles/globals.css";
import "../styles/fontawesome.css";

import type { AppProps } from "next/app";
import { Public_Sans } from "@next/font/google";
import { withPasswordProtect } from "next-password-protect";
import { Footer } from "@creatorhub/footer";

const publicSans = Public_Sans({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<main className={`bg-bg-dark min-h-screen min-w-full ${publicSans.className}`}>
			<Component {...pageProps} />
			<Footer />
		</main>
	);
};

const WithPasswordProtect = process.env.PASSWORD_PROTECT
	? withPasswordProtect(App, {
			checkApiUrl: "/api/staging/passwordCheck",
			loginApiUrl: "/api/staging/login",
			loginComponentProps: {
				logo: "/logo/logo.png",
				buttonBackgroundColor: "#060823",
				buttonColor: "#fff"
			}
	  })
	: App;

export default WithPasswordProtect;

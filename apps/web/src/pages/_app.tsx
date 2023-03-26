import "../styles/globals.css";
import "react-toastify/ReactToastify.css";

import type { AppProps } from "next/app";
import { Public_Sans } from "next/font/google";
import { withPasswordProtect } from "next-password-protect";
import { Footer } from "@creatorhub/footer";
import { SwrWrapper } from "@creatorhub/swr";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

const publicSans = Public_Sans({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], display: "swap" });

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<SwrWrapper>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
					integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</Head>
			<ToastContainer position="top-right" theme="dark" bodyStyle={publicSans.style} />
			<main className={`bg-bg-dark min-h-screen min-w-full ${publicSans.className}`}>
				<Component {...pageProps} />
				<Footer />
			</main>
		</SwrWrapper>
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

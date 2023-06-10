import "../styles/globals.css";
import "react-toastify/ReactToastify.css";
import "nprogress/nprogress.css";

import type { AppProps } from "next/app";
import { Public_Sans } from "next/font/google";
import { withPasswordProtect } from "next-password-protect";
import { Footer } from "@creatorhub/footer";
import { SwrWrapper } from "@creatorhub/swr";
import { ToastContainer } from "react-toastify";
import { NextSeo } from "next-seo";
import nextSeo from "../../next-seo.config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import nProgress from "nprogress";
import { useCookies } from "react-cookie";

const publicSans = Public_Sans({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], display: "swap" });
nProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }: AppProps) => {
	const { locale, route, asPath, replace, events } = useRouter();
	const [cookie] = useCookies(["NEXT_LOCALE"]);

	useEffect(() => {
		if (cookie.NEXT_LOCALE && locale !== cookie.NEXT_LOCALE) void replace(route, asPath, { locale: cookie.NEXT_LOCALE });
	}, [cookie]);

	useEffect(() => {
		const handleRouteStart = () => nProgress.start();
		const handleRouteDone = () => nProgress.done();

		events.on("routeChangeStart", handleRouteStart);
		events.on("routeChangeComplete", handleRouteDone);
		events.on("routeChangeError", handleRouteDone);

		return () => {
			events.off("routeChangeStart", handleRouteStart);
			events.off("routeChangeComplete", handleRouteDone);
			events.off("routeChangeError", handleRouteDone);
		};
	}, []);

	return (
		<SwrWrapper>
			<NextSeo {...nextSeo} />
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
				buttonBackgroundColor: nextSeo.themeColor,
				buttonColor: "#fff"
			}
	  })
	: App;

export default WithPasswordProtect;

import "../styles/globals.css";
import "react-toastify/ReactToastify.css";

import type React from "react";
import Providers from "./Providers";
import { Public_Sans } from "next/font/google";
import { Footer } from "@creatorhub/footer";
import { Metadata } from "next";

const publicSans = Public_Sans({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: "SCR Creator Hub",
	description: "The future of SCR Content Creation",
	themeColor: "#060922",
	openGraph: {
		title: "SCR Creator Hub",
		type: "website",
		locale: "en",
		alternateLocale: [],
		images: [
			{
				url: "https://scrcreate.app/logo/logo.png",
				alt: "SCR Creator Hub logo"
			}
		]
	},
	twitter: { card: "summary" },
	icons: ["/favicon.ico"]
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html suppressHydrationWarning>
			<body className="bg-bg-dark min-h-screen min-w-full" style={publicSans.style}>
				<Providers>{children}</Providers>
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;

import "../styles/globals.css";
import "../styles/fontawesome.css";

import type { AppProps } from "next/app";
import { Public_Sans } from "@next/font/google";

const publicSans = Public_Sans({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<main className={`bg-bg-dark min-h-screen min-w-full ${publicSans.className}`}>
			<Component {...pageProps} />
		</main>
	);
};

export default App;

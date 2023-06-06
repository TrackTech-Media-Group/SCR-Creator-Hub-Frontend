"use client";

import { SwrWrapper } from "@creatorhub/swr";
import { Public_Sans } from "next/font/google";
import React from "react";
import { ToastContainer } from "react-toastify";

const publicSans = Public_Sans({ weight: ["300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"], display: "swap" });

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<SwrWrapper>
			<ToastContainer position="top-right" theme="dark" bodyStyle={publicSans.style} />
			{children}
		</SwrWrapper>
	);
};

export default Providers;

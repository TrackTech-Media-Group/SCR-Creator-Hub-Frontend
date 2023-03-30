import { PrimaryButton } from "@creatorhub/buttons";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { AnimatePresence, motion, Variants } from "framer-motion";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const variants: Variants = {
	init: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1]
		}
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1]
		}
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1]
		}
	}
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { error, code, state } = ctx.query;
	if (Boolean(error) || !code || !state)
		return {
			redirect: {
				destination: "/"
			}
		};

	return {
		props: { code, state }
	};
};

interface Props {
	code: string;
	state: string;
}

const Callback: NextPage<Props> = ({ code, state }) => {
	const [error, setError] = useState("");
	const router = useRouter();

	useEffect(() => {
		const { cancel, token } = axios.CancelToken.source();
		axios
			.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/callback?code=${code}&state=${state}`, {}, { withCredentials: true, cancelToken: token })
			.then(() => void router.push("/users/@me"))
			.catch((err) => {
				setError((err as AxiosError<any>).response?.data.message ?? err.message ?? "unknown error, please try again later!");
			});

		return () => cancel();
	}, []);

	return (
		<div className="h-screen grid place-items-center">
			<NextSeo title="Logging in..." />
			<AnimatePresence mode="wait">
				{error ? (
					<motion.div id="0a" variants={variants} initial="init" animate="animate" exit="exit" className="grid place-items-center">
						<div>
							<h1 className="text-4xl">An unexpected error occured</h1>
							<p className="text-lg text-center">{error}</p>
						</div>
						<PrimaryButton type="link" href="/login" className="mt-8">
							Try again
						</PrimaryButton>
					</motion.div>
				) : (
					<motion.div id="1b" variants={variants} initial="init" animate="animate" exit="exit">
						<PulseLoader color="#fff" size={20} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Callback;

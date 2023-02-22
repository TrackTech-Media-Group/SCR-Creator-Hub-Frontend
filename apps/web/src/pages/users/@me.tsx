import { TransparentButton } from "@creatorhub/buttons";
import { MediaCard } from "@creatorhub/cards";
import { HomeNavbar } from "@creatorhub/navbar";
import { useSwrWithUpdates } from "@creatorhub/swr";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { AnimatePresence, motion, Variants } from "framer-motion";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {},
			redirect: {
				destination: "/login"
			}
		};

	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/user/state`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});
	if (!csrf.data.token.length)
		return {
			props: {},
			redirect: {
				destination: "/login"
			}
		};

	setCookie("XSRF-TOKEN", csrf.data.token, { req: ctx.req, res: ctx.res });

	return {
		props: { csrf: csrf.data.state }
	};
};

interface Props {
	csrf: string;
}

interface UserApiData {
	name: string;
	bookmarks: any[];
	recent: any[];
	dataRequest: string | null;
}

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

const UserAtMe: NextPage<Props> = ({ csrf: _initCsrf }) => {
	// const [csrf, setCsrf] = useState(_initCsrf);
	const [user, setUser] = useState<UserApiData>({ name: "", bookmarks: [], recent: [], dataRequest: null });
	const [loading, setLoading] = useState(true);
	const { data } = useSwrWithUpdates<UserApiData>("/user/");

	useEffect(() => {
		if (data) {
			setUser(data);
			setLoading(false);
		}
	}, [data]);

	return (
		<div className="min-h-screen bg-user_blob bg-repeat bg-center">
			<HomeNavbar />
			<AnimatePresence mode="wait">
				{loading && (
					<motion.div
						id="loading-user"
						variants={variants}
						initial="init"
						animate="animate"
						exit="exit"
						className="w-full h-screen grid place-items-center"
					>
						<PulseLoader color="#fff" size={25} className="rotate-90" />
					</motion.div>
				)}
				{!loading && (
					<motion.div
						id="loaded-user"
						variants={variants}
						initial="init"
						animate="animate"
						exit="exit"
						className="px-32 pt-32 flex flex-col gap-16"
					>
						<div className="pt-12">
							<h1 className="text-3xl">Welcome back {user.name}</h1>
							<p className="text-base">Change your settings, continue where you left off or visit one of your bookmarked items here.</p>
						</div>
						<div>
							<h2 className="text-2xl">Recently viewed</h2>
							<div>
								<MediaCard
									alt="cards_placeholder_image"
									src="/cards_placeholder_image.png"
									href="/images/cards_placeholder_image.png"
								/>
							</div>
						</div>
						<div>
							<h2 className="text-2xl">Bookmarks</h2>
							<div className="backdrop-blur-[8px] rounded-xl bg-gradient-to-br from-white-200 to-white-400">
								<div className="p-4 flex justify-between items-center">
									<img src="/cards_placeholder_image.png" alt="Connect class 730" className="h-12 rounded-md" />
									<div className="flex items-center">
										<p className="text-base">Connect class 730</p>
										<p className="text-base">Train • Connect • Class 730</p>
									</div>
									<TransparentButton type="link" href="/images/card_placeholder_image.png" target="_blank">
										<i className="fa-solid fa-arrow-up-right-from-square" />
									</TransparentButton>
								</div>
								<div className="p-4 flex justify-between items-center">
									<img src="/cards_placeholder_image.png" alt="Connect class 730" className="h-12 rounded-md" />
									<div className="flex items-center">
										<p className="text-base">Connect class 730</p>
										<p className="text-base">Train • Connect • Class 730</p>
									</div>
									<TransparentButton type="link" href="/images/card_placeholder_image.png" target="_blank">
										<i className="fa-solid fa-arrow-up-right-from-square" />
									</TransparentButton>
								</div>
								<div className="p-4 flex justify-between items-center">
									<img src="/cards_placeholder_image.png" alt="Connect class 730" className="h-12 rounded-md" />
									<div className="flex items-center">
										<p className="text-base">Connect class 730</p>
										<p className="text-base">Train • Connect • Class 730</p>
									</div>
									<TransparentButton type="link" href="/images/card_placeholder_image.png" target="_blank">
										<i className="fa-solid fa-arrow-up-right-from-square" />
									</TransparentButton>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default UserAtMe;

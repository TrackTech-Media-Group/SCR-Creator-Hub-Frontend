import { DangerBorderButton, DangerButton, TertiaryBorderButton, TertiaryButton, TransparentButton } from "@creatorhub/buttons";
import { MediaCard } from "@creatorhub/cards";
import { HomeNavbar } from "@creatorhub/navbar";
import { useSwrWithUpdates } from "@creatorhub/swr";
import { ConfirmModal } from "@creatorhub/ui";
import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { AnimatePresence, motion, Variants } from "framer-motion";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

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

	const [ext, domain] = apiUrl.replace("http://", "").replace("https://", "").split(".").reverse();
	setCookie("XSRF-TOKEN", csrf.data.token, { req: ctx.req, res: ctx.res, domain: `.${domain}.${ext}` });

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
	const router = useRouter();

	const [csrf] = useState(_initCsrf);
	const [user, setUser] = useState<UserApiData>({ name: "", bookmarks: [], recent: [], dataRequest: null });
	const [loading, setLoading] = useState(true);
	const { data } = useSwrWithUpdates<UserApiData>("/user/");

	useEffect(() => {
		if (data) {
			setUser(data);
			setLoading(false);
		}
	}, [data]);

	const [deleteSessions, setDeleteSessions] = useState(false);
	const deleteSessionsFn = async () => {
		const promise = async () => {
			try {
				await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/sessions`, { headers: { "XSRF-TOKEN": csrf }, withCredentials: true });
			} catch (err) {
				const _error = "isAxiosError" in err ? (err as AxiosError<{ message: string }>).response?.data.message : "";
				const error = _error || "Unknown error, please try again later.";
				console.log(`[DeleteSessions]: ${error}`);

				throw new Error();
			}
		};

		try {
			await toast.promise(promise(), {
				pending: "Shredding train tickets...",
				error: "Unable to destroy the train tickets :(",
				success: "Tickets destroyed."
			});

			void router.push("/");
		} catch (error) {}

		setDeleteSessions(false);
	};

	const [deleteUser, setDeleteUser] = useState(false);
	const deleteUserFn = async () => {
		const promise = async () => {
			try {
				await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete`, { headers: { "XSRF-TOKEN": csrf }, withCredentials: true });
			} catch (err) {
				const _error = "isAxiosError" in err ? (err as AxiosError<{ message: string }>).response?.data.message : "";
				const error = _error || "Unknown error, please try again later.";
				console.log(`[DeleteUser]: ${error}`);

				throw new Error();
			}
		};

		try {
			await toast.promise(promise(), {
				pending: "Shredding train seat...",
				error: "Unable to destroy the train seat :(",
				success: "Train seat destroyed."
			});

			void router.push("/");
		} catch (error) {}

		setDeleteUser(false);
	};

	return (
		<div className="min-h-screen bg-user_blob bg-repeat bg-center">
			<HomeNavbar />
			<ConfirmModal isOpen={deleteSessions} cancel={() => setDeleteSessions(false)} confirm={deleteSessionsFn} />
			<ConfirmModal isOpen={deleteUser} cancel={() => setDeleteUser(false)} confirm={deleteUserFn} />
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
						className="px-32 pt-32 flex flex-col gap-16 max-lg:px-16 max-md:px-8 max-sm:px-4 pb-8"
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
								<div className="p-4 flex justify-between items-center gap-2">
									<img src="/cards_placeholder_image.png" alt="Connect class 730" className="h-12 rounded-md" />
									<div className="flex items-center gap-2">
										<p className="text-base">Connect class 730</p>
										<p className="text-base">Train • Connect • Class 730</p>
									</div>
									<TransparentButton type="link" href="/images/card_placeholder_image.png" target="_blank">
										<i className="fa-solid fa-arrow-up-right-from-square" />
									</TransparentButton>
								</div>
								<div className="p-4 flex justify-between items-center gap-2">
									<img src="/cards_placeholder_image.png" alt="Connect class 730" className="h-12 rounded-md" />
									<div className="flex items-center gap-2">
										<p className="text-base">Connect class 730</p>
										<p className="text-base">Train • Connect • Class 730</p>
									</div>
									<TransparentButton type="link" href="/images/card_placeholder_image.png" target="_blank">
										<i className="fa-solid fa-arrow-up-right-from-square" />
									</TransparentButton>
								</div>
								<div className="p-4 flex justify-between items-center gap-2">
									<img src="/cards_placeholder_image.png" alt="Connect class 730" className="h-12 rounded-md" />
									<div className="flex items-center gap-2">
										<p className="text-base">Connect class 730</p>
										<p className="text-base">Train • Connect • Class 730</p>
									</div>
									<TransparentButton type="link" href="/images/card_placeholder_image.png" target="_blank">
										<i className="fa-solid fa-arrow-up-right-from-square" />
									</TransparentButton>
								</div>
							</div>
						</div>
						<div>
							<h2 className="text-2xl">Settings</h2>
							<p className="text-base">
								We value your privacy, we will always be open about the content we store about you. Request all of your data below or
								delete your account if you want everything removed*.{" "}
							</p>
							<p className="text-base text-gray-600">* Deleting your account is a permanent action and cannot be undone.</p>
							<div className="flex items-center gap-2">
								<DangerButton type="button" className="mt-4" onClick={() => setDeleteUser(true)}>
									Delete Account
								</DangerButton>
								<DangerBorderButton type="button" className="mt-4" onClick={() => setDeleteSessions(true)}>
									Logout of all sessions
								</DangerBorderButton>
							</div>
						</div>
						<div>
							<h2 className="text-2xl">Data Request</h2>
							<p className="text-base">
								Our bookworms are working hard to give you everything they can find about you in our database, this process may take
								up to a day to complete. Once they are finished, you will find a download button below.
							</p>
							<div className="flex items-center gap-2">
								<TertiaryButton type="button" className="mt-4" disabled>
									Download
								</TertiaryButton>
								<TertiaryBorderButton type="button" className="mt-4">
									Request Data
								</TertiaryBorderButton>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default UserAtMe;

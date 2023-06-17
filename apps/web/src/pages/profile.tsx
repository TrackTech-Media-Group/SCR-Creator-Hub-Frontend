import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { getCookie } from "cookies-next";
import { useUser } from "@creatorhub/hooks";
import { ConfirmModal, WithLoading } from "@creatorhub/ui";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { UserNavbar } from "@creatorhub/navbar";
import { ProgressiveImage, UserCard } from "@creatorhub/cards";
import { DangerBorderButton, DangerButton, TransparentButton } from "@creatorhub/buttons";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { destoryUser, destorySessions, getCsrfToken, setCookie, Type } from "@creatorhub/utils";
import { toast } from "react-toastify";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {},
			redirect: {
				permanent: false,
				destination: "/login"
			}
		};

	const csrfToken = await getCsrfToken();
	setCookie("XSRF-TOKEN", csrfToken.token, { req: ctx.req, res: ctx.res });

	return {
		props: {
			csrf: csrfToken.state
		}
	};
};

const Profile: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrf }) => {
	const [deleteSessions, setDeleteSessions] = useState(false);
	const [deleteUser, setDeleteUser] = useState(false);

	const { t } = useTranslation();
	const { user, loading } = useUser();
	const router = useRouter();

	const recentExist = Boolean(user?.recent.length);
	const bookmarksExist = Boolean(user?.bookmarks.length);

	if (!loading && !user) {
		void router.replace("/login");
		return <div className="min-h-screen"></div>;
	}

	const onError = (error: any) => {
		console.error("[ERROR LOGGER]", error);
	};

	const destroyUserFn = () => {
		toast
			.promise(destoryUser(csrf), {
				pending: t("profile:delete_account.promise"),
				error: t("profile:delete_account.error"),
				success: t("profile:delete_account.success")
			})
			.then(() => void router.push("/"))
			.catch((err) => {
				setDeleteUser(false);
				onError(err);
			});
	};

	const destroySessionsFn = () => {
		toast
			.promise(destorySessions(csrf), {
				pending: t("profile:delete_sessions.promise"),
				error: t("profile:delete_sessions.error"),
				success: t("profile:delete_sessions.success")
			})
			.then(() => void router.push("/"))
			.catch((err) => {
				setDeleteSessions(false);
				onError(err);
			});
	};

	return (
		<WithLoading loading={loading}>
			<NextSeo title={`${user?.username}'s profile`} />
			<ConfirmModal isOpen={deleteSessions} cancel={() => setDeleteSessions(false)} confirm={destroySessionsFn} />
			<ConfirmModal isOpen={deleteUser} cancel={() => setDeleteUser(false)} confirm={destroyUserFn} />
			<UserNavbar />
			<div className="px-32 pt-32 flex flex-col gap-16 max-lg:px-16 max-md:px-8 max-sm:px-4 pb-8">
				<div className="pt-12">
					<h1 className="text-3xl">{t("profile:welcome", { user: user?.username })}</h1>
					<p className="text-base">{t("profile:description")}</p>
				</div>
				{recentExist && (
					<div>
						<h2 className="text-2xl capitalize">{t("profile:recent.title")}</h2>
						<div className="flex items-center gap-2 overflow-x-auto">
							{user?.recent.map((recent, key) => (
								<UserCard
									key={key}
									name={recent.name}
									src={recent.preview}
									type={recent.type}
									href={`/${recent.type}/${recent.id}`}
								/>
							))}
						</div>
					</div>
				)}
				{bookmarksExist && (
					<div>
						<h2 className="text-2xl capitalize">{t("profile:bookmarks.title")}</h2>
						<div className="backdrop-blur-[8px] rounded-xl bg-gradient-to-br from-white-200 to-white-400">
							{user?.bookmarks.map((bookmark, key) => (
								<div key={key} className="p-4 flex justify-between items-center gap-2">
									<div className="flex items-center gap-4">
										<ProgressiveImage
											height={48}
											width=""
											loading="lazy"
											src={bookmark.type === Type.Music ? "music-thumbnail.png" : bookmark.preview}
											alt={bookmark.name}
											className="h-12 rounded-md"
										/>
										<p className="text-base">{bookmark.name}</p>
									</div>
									<div className="flex items-center gap-2">
										<p className="text-base">
											{bookmark.tags
												.slice(0, 5)
												.map((tag) => tag.name)
												.join(" • ")}
										</p>
									</div>
									<TransparentButton type="link" href={`/${bookmark.type}/${bookmark.id}`} target="_blank">
										<i className="fa-solid fa-arrow-up-right-from-square" />
									</TransparentButton>
								</div>
							))}
						</div>
					</div>
				)}
				<div>
					<h2 className="text-2xl capitalize">{t("profile:settings.title")}</h2>
					<p className="text-base">{t("profile:settings.description")}*</p>
					<p className="text-base text-gray-600">* {t("profile:settings.disclaimer")}</p>
					<div className="flex items-center gap-2">
						<DangerButton type="button" className="mt-4" onClick={() => setDeleteUser(true)}>
							{t("profile:settings.delete_account")}
						</DangerButton>
						<DangerBorderButton type="button" className="mt-4" onClick={() => setDeleteSessions(true)}>
							{t("profile:settings.delete_sessions")}
						</DangerBorderButton>
					</div>
				</div>
			</div>
		</WithLoading>
	);
};

export default Profile;

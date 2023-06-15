import { TransparentButton, WhiteButton } from "@creatorhub/buttons";
import { useContent } from "@creatorhub/hooks";
import { AttributionModal, ContentDisplays, MediaDetailsLayout, TagButton, WithLoading } from "@creatorhub/ui";
import { CONTENT_TYPES, Type, getCsrfToken, setCookie, toggleBookmark } from "@creatorhub/utils";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import { OpenGraph } from "next-seo/lib/types";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import NotFoundPage from "../404";

export const getServerSideProps: GetServerSideProps<{ csrf: string; id: string; type: Type }> = async (ctx) => {
	const type = ctx.params!.content as Type;
	if (!CONTENT_TYPES.includes(type)) return { notFound: true };

	const csrfToken = await getCsrfToken();
	setCookie("XSRF-TOKEN", csrfToken.token, {
		req: ctx.req,
		res: ctx.res
	});

	return {
		props: { csrf: csrfToken.state, type, id: ctx.params!.id as string }
	};
};

const ContentDetails: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrf, id, type }) => {
	const { attributionReminder, setAttributionReminder, showFull, setShowFull, marked, setMarked, loading, content } = useContent(id);

	const router = useRouter();
	const { t } = useTranslation();
	const markedIsBoolean = typeof marked === "boolean";

	if (!loading && !content) return <NotFoundPage />;
	if (!loading && content && content.type !== type) {
		void router.push(`/${content.type}/${content.id}`);
		return <div></div>;
	}

	/**
	 * Copies text to clipboard
	 * @param text The text to copy
	 */
	const copyText = (text: string) => {
		void navigator.clipboard.writeText(text);

		const message = t("common:copied_clipboard");
		toast.info(message);
	};

	/**
	 * (un)bookmarks the content item
	 */
	const bookmark = async () => {
		if (!content) return;
		const type = marked ? "marked" : "unmarked";

		const result = await toast
			.promise(toggleBookmark(content.id, csrf), {
				pending: t(`content:bookmark.${type}.pending`),
				error: t(`content:bookmark.${type}.error`),
				success: t(`content:bookmark.${type}.success`)
			})
			.catch(() => null);
		setMarked(result);
	};

	const getOpenGraph = () => {
		const openGraphContentType = type === Type.Image ? "images" : type === Type.Music ? "audio" : "videos";
		const openGraph: OpenGraph = {
			siteName: "SCR Creator Hub",
			title: t("content:metadata.title", { title: content?.name }),
			description: t("content:metadata.description"),
			[openGraphContentType]: [
				{
					url: content?.preview ?? "",
					alt: content?.name ?? ""
				}
			]
		};

		return openGraph;
	};

	return (
		<WithLoading loading={loading}>
			{content && (
				<MediaDetailsLayout>
					<AttributionModal isOpen={attributionReminder} onClick={() => setAttributionReminder(false)} toast={toast.info} />
					<NextSeo titleTemplate={t("content:metadata.title", { title: "%s" })} title={content.name} openGraph={getOpenGraph()} />
					<ContentDisplays
						name={content.name}
						poster={content.preview}
						preview={content.downloads[0].url}
						setShowFull={setShowFull}
						showFull={showFull}
						type={content.type}
					/>
					<div className="w-full flex flex-col justify-center gap-2">
						<div className="flex justify-between items-center mt-8 max-md:-mt-4">
							<h1 className="text-subtitle max-lg:text-3xl max-md:text-2xl max-sm:text-xl">{content.name}</h1>
							{markedIsBoolean && (
								<TransparentButton type="button" onClick={bookmark}>
									<i
										className={`fa-regular ${
											marked ? "!font-semibold" : "!font-normal"
										} fa-bookmark text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg`}
									/>
								</TransparentButton>
							)}
						</div>
						<div className="w-full flex gap-2 items-center flex-wrap">
							{content.tags.map((tag, key) => (
								<TagButton {...tag} key={key} />
							))}
						</div>
					</div>
					<div>
						<h2 className="text-xl capitalize">{t("content:downloads.title")}</h2>
						<div className="flex items-center gap-4 flex-wrap">
							{content.downloads.map((download, key) => (
								<WhiteButton
									key={key}
									type="link"
									target="_blank"
									onClick={() => setAttributionReminder(true)}
									href={`${download.url}?download=true`}
									className="border-white-400 border hover:border-white-800"
								>
									{download.name}
								</WhiteButton>
							))}
						</div>
					</div>
					<div>
						<h2 className="text-xl capitalize">{t("content:use_cases.title")}</h2>
						<p className="text-base">{content.useCases.join(", ")}</p>
					</div>
					<div className="w-1/2 max-lg:w-3/4 max-md:w-full pb-8">
						<h2 className="text-xl capitalize">{t("content:contribution.title")}</h2>
						<p className="text-base">{t("content:contribution.description")}</p>
						<div className="mt-4">
							<h3 className="text-lg capitalize">{t("content:contribution.description_title")}</h3>
							<div className="bg-grey p-2 rounded-xl relative mt-1">
								<p className="text-base pr-12">{t("common:modals.contribution.contribution_text")}</p>
								<TransparentButton
									type="button"
									className="absolute top-0 right-0"
									onClick={() => copyText(t("common:modals.contribution.contribution_text"))}
								>
									<i className="fa-solid fa-copy" />
								</TransparentButton>
							</div>
						</div>
					</div>
				</MediaDetailsLayout>
			)}
		</WithLoading>
	);
};

export default ContentDetails;

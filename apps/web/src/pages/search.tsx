import { MediaCard } from "@creatorhub/cards";
import { parseSearchQuery, useSearch } from "@creatorhub/hooks";
import { MediaLayout, PageSelector } from "@creatorhub/ui";
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { query, tag, type } = parseSearchQuery(ctx.query);
	return {
		props: { query, tag, type }
	};
};

const Search: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
	const { page, setPage, pages, content } = useSearch(props);
	const { t } = useTranslation();

	return (
		<MediaLayout returnButton searchQuery={props.query} className="max-xl:px-16 max-md:px-8 max-sm:px-2">
			<NextSeo title={t("search:title")} />
			<div className="flex flex-wrap justify-center w-full pb-8 gap-2">
				{content.map((content, key) => (
					<MediaCard key={key} type={content.type} src={content.preview} name={content.name} href={`/${content.type}/${content.id}`} />
				))}
			</div>
			<PageSelector page={page} pages={pages} setPage={setPage} />
		</MediaLayout>
	);
};

export default Search;

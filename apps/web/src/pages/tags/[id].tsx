import { MediaCard } from "@creatorhub/cards";
import { parseTagQuery, useTag } from "@creatorhub/hooks";
import { TagLayout } from "@creatorhub/ui";
import { Type } from "@creatorhub/utils";
import type { GetServerSidePropsContext, NextPage } from "next";
import { NextSeo } from "next-seo";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
	const { type } = parseTagQuery(ctx.query);
	return {
		props: { tag: ctx.params!.id, type }
	};
};

interface Props {
	tag: string;
	type: Type;
}

const TagsHome: NextPage<Props> = ({ tag, type: _type }) => {
	const { content, page, pages, setPage, setType, type } = useTag({ tag, type: _type });

	return (
		<TagLayout tag={tag} type={type} setType={setType} page={page} pages={pages} setPage={setPage}>
			<NextSeo title={tag} />
			<div className="flex flex-wrap gap-2 justify-center pb-8">
				{content.map((item) => (
					<MediaCard key={item.id} type={type} src={item.preview} href={`/${item.type}/${item.id}`} name={item.name} />
				))}
			</div>
		</TagLayout>
	);
};

export default TagsHome;

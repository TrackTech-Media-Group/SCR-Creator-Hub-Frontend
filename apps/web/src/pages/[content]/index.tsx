import { useTags } from "@creatorhub/hooks";
import { DisplaySection, MediaLayout } from "@creatorhub/ui";
import { CONTENT_TYPES, Type, parseQuery } from "@creatorhub/utils";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";

export const getStaticPaths: GetStaticPaths = (ctx) => {
	const basePaths = ["video", "image"].map((content) => ({ params: { content } }));
	const languagePaths = (ctx.locales ?? []).map((locale) => basePaths.map((path) => ({ ...path, locale }))).reduce((a, b) => [...a, ...b]);

	return { fallback: false, paths: [...languagePaths, ...basePaths] };
};

export const getStaticProps: GetStaticProps<{ type: Type }> = (ctx) => {
	const contentType = parseQuery(ctx.params!.content);
	if (!CONTENT_TYPES.includes(contentType as any)) return { notFound: true };

	return { props: { type: contentType! as Type } };
};

const ContentHome: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ type }) => {
	const tags = useTags(type);

	return (
		<MediaLayout>
			<NextSeo title={`${type} content`} />
			<div className="flex flex-col items-center justify-center gap-y-32 pb-8">
				{tags.map((tag) => (
					<DisplaySection key={tag.id} tag={tag.name} id={tag.id} type={type} />
				))}
			</div>
		</MediaLayout>
	);
};

export default ContentHome;

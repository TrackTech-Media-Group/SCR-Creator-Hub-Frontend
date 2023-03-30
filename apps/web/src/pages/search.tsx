import { MediaCard } from "@creatorhub/cards";
import { useSwrWithUpdates } from "@creatorhub/swr";
import { MediaLayout, PageSelector } from "@creatorhub/ui";
import axios from "axios";
import { getCookie } from "cookies-next";
import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { q: _q, tag: _tag } = ctx.query;
	const searchQuery = typeof _q === "string" ? _q : Array.isArray(_q) ? _q[0] : "";
	const tag = typeof _tag === "string" ? _tag : Array.isArray(_tag) ? _tag[0] : "";

	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {
				loggedIn: false,
				searchQuery,
				tag
			}
		};

	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/user/state`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});
	if (!csrf.data.token.length)
		return {
			props: {
				loggedIn: false,
				searchQuery,
				tag
			}
		};

	return {
		props: { loggedIn: true, searchQuery, tag }
	};
};

interface Props {
	loggedIn: boolean;
	searchQuery: string;
	tag: string;
}

const Search: NextPage<Props> = ({ loggedIn, searchQuery, tag }) => {
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);
	const [footage, setFootage] = useState<{ id: string; name: string; preview: string; type: "video" | "image" }[]>([]);
	const { data: footageData } = useSwrWithUpdates<{
		entries: { id: string; name: string; preview: string; type: "video" | "image" }[];
		pages: number;
	}>(`/search?query=${encodeURIComponent(searchQuery)}&page=${page}&tag=${tag}`);
	useEffect(() => {
		if (footageData) {
			setPages(footageData.pages);
			setFootage(footageData.entries);
		}
	}, [footageData]);

	return (
		<MediaLayout returnButton isLoggedIn={loggedIn} searchQuery={searchQuery} tag={tag} className="max-xl:px-16 max-md:px-8 max-sm:px-2">
			<NextSeo title="Searching for SCR content" />
			<div className="flex flex-wrap justify-center w-full pb-8 gap-2">
				{footage.map((footage, key) => (
					<MediaCard key={key} type={footage.type} src={footage.preview} name={footage.name} href={`/${footage.type}s/${footage.id}`} />
				))}
			</div>
			<PageSelector page={page} pages={pages} setPage={setPage} />
		</MediaLayout>
	);
};

export default Search;

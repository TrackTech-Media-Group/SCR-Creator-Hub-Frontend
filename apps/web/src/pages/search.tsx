import { MediaCard } from "@creatorhub/cards";
import { useSwrWithUpdates } from "@creatorhub/swr";
import { MediaLayout, PageSelector } from "@creatorhub/ui";
import axios from "axios";
import { getCookie } from "cookies-next";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { q: _q } = ctx.query;
	const searchQuery = typeof _q === "string" ? _q : Array.isArray(_q) ? _q[0] : "";

	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {
				loggedIn: false,
				searchQuery
			}
		};

	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/user/state`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});
	if (!csrf.data.token.length)
		return {
			props: {
				loggedIn: false,
				searchQuery
			}
		};

	return {
		props: { loggedIn: true, searchQuery }
	};
};

interface Props {
	loggedIn: boolean;
	searchQuery: string;
}

const Search: NextPage<Props> = ({ loggedIn, searchQuery }) => {
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);
	const [footage, setFootage] = useState<{ id: string; name: string; preview: string; type: "video" | "image" }[]>([]);
	const { data: footageData } = useSwrWithUpdates<{
		entries: { id: string; name: string; preview: string; type: "video" | "image" }[];
		pages: number;
	}>(`/search?query=${encodeURIComponent(searchQuery)}&page=${page}`);
	useEffect(() => {
		if (footageData) {
			setPages(footageData.pages);
			setFootage(footageData.entries);
		}
	}, [footageData]);

	return (
		<MediaLayout isLoggedIn={loggedIn} searchQuery={searchQuery}>
			<div className="flex flex-wrap items-center w-full pb-8 gap-2">
				{footage.map((footage, key) => (
					<MediaCard key={key} type={footage.type} src={footage.preview} name={footage.name} href={`/${footage.type}s/${footage.id}`} />
				))}
			</div>
			<PageSelector page={page} pages={pages} setPage={setPage} />
		</MediaLayout>
	);
};

export default Search;

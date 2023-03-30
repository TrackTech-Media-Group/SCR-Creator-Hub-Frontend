import { MediaCard } from "@creatorhub/cards";
import { useSwrWithUpdates } from "@creatorhub/swr";
import { TagLayout } from "@creatorhub/ui";
import axios from "axios";
import { getCookie } from "cookies-next";
import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	let { type } = ctx.query;
	if (typeof type !== "string" || !["image", "video"].includes(type)) type = "image";

	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {
				loggedIn: false,
				id: ctx.params!.id,
				type
			}
		};

	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/user/state`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});
	if (!csrf.data.token.length)
		return {
			props: {
				loggedIn: false,
				id: ctx.params!.id,
				type
			}
		};

	return {
		props: { loggedIn: true, id: ctx.params!.id, type }
	};
};

interface Props {
	loggedIn: boolean;
	id: string;
	type: string;
}

const TagsHome: NextPage<Props> = ({ loggedIn, id, type: _type }) => {
	const [type, setType] = useState(_type);
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);
	const [footage, setFootage] = useState<{ id: string; name: string; preview: string }[]>([]);
	const { data: footageData } = useSwrWithUpdates<{ entries: { id: string; name: string; preview: string }[]; pages: number }>(
		`/tags/${id}?preview=false&type=${type}&page=${page}`
	);
	useEffect(() => {
		if (footageData) {
			setPages(footageData.pages);
			setFootage(footageData.entries);
		}
	}, [footageData]);

	return (
		<TagLayout tag={id} isLoggedIn={loggedIn} type={type} setType={setType} page={page} pages={pages} setPage={setPage}>
			<NextSeo title={id} />
			<div className="flex flex-wrap gap-2 justify-center pb-8">
				{footage.map((f) => (
					<MediaCard key={f.id} type={type as any} src={f.preview} href={`/${type}s/${f.id}`} name={f.name} />
				))}
			</div>
		</TagLayout>
	);
};

export default TagsHome;

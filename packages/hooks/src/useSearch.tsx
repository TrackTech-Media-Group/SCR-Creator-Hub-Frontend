import { useSwrWithUpdates } from "@creatorhub/swr";
import type { Content, Type } from "@creatorhub/utils";
import type { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

interface Props {
	tag: string;
	type: string;
	query: string;
}

interface ApiSearchData {
	entries: Content[];
	pages: number;
}

/**
 * A Hook which provides easy a to use search system
 */
export const useSearch = ({ tag, type, query }: Props) => {
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);

	const [content, setContent] = useState<Content[]>([]);
	const { data: contentData } = useSwrWithUpdates<ApiSearchData>(
		`/v1/search?query=${encodeURIComponent(query)}&page=${page}&tag=${tag}&type=${type}`
	);
	useEffect(() => {
		if (contentData) {
			setPages(contentData.pages);
			setContent(contentData.entries);
		}
	}, [contentData]);

	return { page, setPage, pages, content };
};

export const parseSearchQuery = (query: ParsedUrlQuery) => {
	const { q: _q, tag: _tag, type: __type, content: __content } = query;
	const searchQuery = typeof _q === "string" ? _q : Array.isArray(_q) ? _q[0] : "";
	const tag = typeof _tag === "string" ? _tag : Array.isArray(_tag) ? _tag[0] : "";

	const _type = typeof __type === "string" ? __type : Array.isArray(__type) ? __type[0] : "";
	let type = ["image", "video", "music", "all"].includes(_type) ? _type : "all";

	const _content = typeof __content === "string" ? __content : Array.isArray(__content) ? __content[0] : "";
	const content = ["image", "video", "music"].includes(_content) ? _content : undefined;
	if (content) type = content;

	return { query: searchQuery, tag, type: type as Type };
};

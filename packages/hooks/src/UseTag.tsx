import { useSwrWithUpdates } from "@creatorhub/swr";
import type { Content, Type } from "@creatorhub/utils";
import type { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

interface Props {
	tag: string;
	type: Type;
}

interface ApiSearchData {
	entries: Content[];
	pages: number;
}

/**
 * A Hook which provides easy a to use tag system
 */
export const useTag = ({ tag, type: _type }: Props) => {
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);
	const [type, setType] = useState<Type>(_type);

	const [content, setContent] = useState<Content[]>([]);
	const { data: contentData } = useSwrWithUpdates<ApiSearchData>(`/v1/tags/${tag}?page=${page}&type=${type}`);
	useEffect(() => {
		if (contentData) {
			setPages(contentData.pages);
			setContent(contentData.entries);
		}
	}, [contentData]);

	return { page, setPage, pages, content, setType, type };
};

export const parseTagQuery = (query: ParsedUrlQuery) => {
	const { type: __type } = query;

	const _type = typeof __type === "string" ? __type : Array.isArray(__type) ? __type[0] : "";
	const type = ["image", "video", "music", "all"].includes(_type) ? _type : "all";

	return { type: type as Type };
};

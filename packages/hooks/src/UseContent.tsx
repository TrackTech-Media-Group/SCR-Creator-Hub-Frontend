import type { Content } from "@creatorhub/utils";
import { useEffect, useState } from "react";
import axios from "axios";

export const useContentList = ({ tag, type }: { tag: string; type: string }) => {
	const [content, setContent] = useState<Content[]>([]);

	useEffect(() => {
		axios
			.get<Content[]>(`${process.env.NEXT_PUBLIC_API_URL}/v1/tags/${tag}?preview=true&type=${type}`)
			.then(({ data }) => setContent(data))
			.catch(() => void 0);
	}, []);

	return content;
};

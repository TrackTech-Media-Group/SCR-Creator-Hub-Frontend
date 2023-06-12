import type { Content } from "@creatorhub/utils";
import { getCookie } from "cookies-next";
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

interface UseContentApiResponse {
	content: Content;
	marked: boolean;
}

export const useContent = (id: string) => {
	const [content, setContent] = useState<Content>();
	const [marked, setMarked] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(true);

	const [showFull, setShowFull] = useState(false);
	const [attributionReminder, setAttributionReminder] = useState(false);

	useEffect(() => {
		const processData = (data: UseContentApiResponse) => {
			setContent(data.content);
			setMarked(data.marked);
		};

		const cookie = getCookie("CH-SESSION");
		axios
			.get<UseContentApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/v1/content/${id}`, {
				headers: { "X-USER-TOKEN": cookie, Authorization: `User ${cookie}` }
			})
			.then(({ data }) => processData(data))
			.catch(() => void 0)
			.finally(() => setLoading(false));
	}, []);

	return { content, setMarked, marked, loading, showFull, setShowFull, attributionReminder, setAttributionReminder };
};

import { useSwrWithUpdates } from "@creatorhub/swr";
import type { Content, Tag } from "@creatorhub/utils";
import { useEffect, useState } from "react";

export const useMusicTags = () => {
	const [tags, setTags] = useState<Tag[]>([]);
	const { data: tagData } = useSwrWithUpdates<Tag[]>("/v1/music/type");
	useEffect(() => {
		if (tagData) setTags(tagData);
	}, [tagData]);

	return tags;
};

export const useMusicDuration = (type: string) => {
	const [duration, setDuration] = useState<string[]>([]);
	const { data: durationData } = useSwrWithUpdates<string[]>(`/v1/music/${type}`);
	useEffect(() => {
		if (durationData) setDuration(durationData);
	}, [durationData]);

	return duration;
};

export const useMusicResults = (type: string, duration: string) => {
	const [content, setContent] = useState<Content[]>([]);
	const { data } = useSwrWithUpdates<Content[]>(`/v1/music/${type}/${duration}`);
	useEffect(() => {
		if (data) setContent(data);
	}, [data]);

	return content;
};

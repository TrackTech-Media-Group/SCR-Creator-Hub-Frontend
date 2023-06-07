import { useSwrWithUpdates } from "@creatorhub/swr";
import { useEffect, useState } from "react";

export const useTags = () => {
	const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
	const { data: tagData } = useSwrWithUpdates<{ id: string; name: string }[]>("/v1/tags");
	useEffect(() => {
		if (tagData) setTags(tagData);
	}, [tagData]);

	return tags;
};

import { useSwrWithUpdates } from "@creatorhub/swr";
import type { Tag, Type } from "@creatorhub/utils";
import { useEffect, useState } from "react";

export const useTags = (type?: Type | "force") => {
	const [tags, setTags] = useState<Tag[]>([]);
	const { data: tagData } = useSwrWithUpdates<Tag[]>(`/v1/tags?type=${type || "all"}`);
	useEffect(() => {
		if (tagData) setTags(tagData);
	}, [tagData]);

	return tags;
};

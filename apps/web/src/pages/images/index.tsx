import { useSwrWithUpdates } from "@creatorhub/swr";
import { DisplaySection, MediaLayout } from "@creatorhub/ui";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const ImagesHome: NextPage = () => {
	const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
	const { data: tagData } = useSwrWithUpdates<{ id: string; name: string }[]>("/admin/tags");
	useEffect(() => {
		if (tagData) setTags(tagData);
	}, [tagData]);

	return (
		<MediaLayout>
			<div className="flex flex-col items-center justify-center gap-y-32 pb-8">
				{tags.map((tag) => (
					<DisplaySection key={tag.id} tag={tag.name} id={tag.id} type="image" />
				))}
			</div>
		</MediaLayout>
	);
};

export default ImagesHome;

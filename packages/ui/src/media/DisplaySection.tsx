import { TransparentButton } from "@creatorhub/buttons";
import { MediaCard } from "@creatorhub/cards";
import { useContentList } from "@creatorhub/hooks";
import type { Type } from "@creatorhub/utils";
import type React from "react";

interface Props {
	tag: string;
	id: string;
	type: Type;
}

export const DisplaySection: React.FC<Props> = ({ tag, id, type }) => {
	const contentList = useContentList({ tag: id, type });

	return (
		<div>
			<div className="flex items-center justify-center gap-2">
				<h1 className="text-3xl mb-4">{tag}</h1>
				<TransparentButton type="link" href={`/tags/${id}?type=${type}`} className="pt-0">
					<i className="fa-solid fa-arrow-right-long text-2xl" />
				</TransparentButton>
			</div>
			<div className="flex flex-wrap gap-4 justify-center">
				{contentList.map((content) => (
					<MediaCard key={content.id} type={type} name={content.name} src={content.preview} href={`/${content.type}/${content.id}`} />
				))}
			</div>
		</div>
	);
};

import { TransparentButton } from "@creatorhub/buttons";
import { MediaCard } from "@creatorhub/cards";
import { useSwr } from "@creatorhub/swr";
import type React from "react";
import { useEffect, useState } from "react";

interface Props {
	tag: string;
	id: string;
	type: "image" | "video";
}

export const DisplaySection: React.FC<Props> = ({ tag, id, type }) => {
	const [footage, setFootage] = useState<{ id: string; name: string; preview: string }[]>([]);
	const { data: footageData } = useSwr<{ id: string; name: string; preview: string }[]>(`/tags/${id}?preview=true&type=${type}`);
	useEffect(() => {
		if (footageData) setFootage(footageData);
	}, [footageData]);

	return (
		<div>
			<div className="flex items-center justify-center gap-2">
				<h1 className="text-3xl mb-4">{tag}</h1>
				<TransparentButton type="link" href={`/tags/${id}?type=${type}`} className="pt-0">
					<i className="fa-solid fa-arrow-right-long text-2xl" />
				</TransparentButton>
			</div>
			<div className="flex flex-wrap gap-4 justify-center">
				{footage.map((footage) => (
					<MediaCard key={footage.id} type={type} name={footage.name} src={footage.preview} href={`/${type}s/${footage.id}`} />
				))}
			</div>
		</div>
	);
};

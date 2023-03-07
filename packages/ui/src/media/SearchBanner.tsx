import { TransparentButton } from "@creatorhub/buttons";
import { Input } from "@creatorhub/forms";
import { useSwrWithUpdates } from "@creatorhub/swr";
import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";

interface Props {
	searchQuery?: string;
}

const SearchBanner: React.FC<Props> = ({ searchQuery = "" }) => {
	const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
	const { data: tagData } = useSwrWithUpdates<{ id: string; name: string }[]>("/admin/tags");
	useEffect(() => {
		if (tagData) setTags(tagData);
	}, [tagData]);

	const router = useRouter();
	const [search, setSearch] = useState(searchQuery);
	const searchItem = (bool: boolean) => {
		if (!bool) return;
		void router.push(`/search?q=${encodeURIComponent(search)}`);
	};

	return (
		<div className="px-32 bg-media_search_banner bg-no-repeat bg-center min-h-[600px] pt-52 max-md:px-16 max-sm:px-4">
			<div className="flex flex-col justify-center w-full gap-4">
				<div>
					<h1 className="text-3xl">Explore our library</h1>
					<p className="text-base -mt-2">Use the search bar or select one of many tags to get more specific results.</p>
				</div>
				<div className="max-h-[4rem] flex gap-8 w-full">
					<Input
						type="main"
						className="glass backdrop-blur text-base rounded-xl h-16 w-full p-4 outline-2 outline-transparent outline focus:outline-white-600 transition-all placeholder:text-white-600"
						placeholder="I am looking for..."
						value={search}
						onChange={(ctx) => setSearch(ctx.currentTarget.value)}
						onKeyUpCapture={(ev) => searchItem(ev.key === "Enter")}
					/>
					<TransparentButton type="button" onClick={() => searchItem(true)} className="glass !w-16 !h-16">
						<i className="fa-solid fa-magnifying-glass text-base" />
					</TransparentButton>
				</div>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag, key) => (
						<TransparentButton
							key={key}
							type="link"
							href={`/tags/${tag.id}`}
							className="glass transition-colors border-2 border-transparent hover:border-white-400 hover:text-white"
						>
							<p className="flex gap-1">
								<span className="text-highlight">#</span> {tag.name}
							</p>
						</TransparentButton>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchBanner;

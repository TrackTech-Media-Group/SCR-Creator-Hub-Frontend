import { TransparentButton } from "@creatorhub/buttons";
import { Input } from "@creatorhub/forms";
import { useTags } from "@creatorhub/hooks";
import { SearchTypes } from "@creatorhub/utils";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import type React from "react";
import { useState } from "react";

interface Props {
	searchQuery?: string;
	returnButton?: boolean;
}

const SearchBanner: React.FC<Props> = ({ searchQuery = "", returnButton }) => {
	const { t } = useTranslation();
	const tags = useTags();
	const router = useRouter();
	const [search, setSearch] = useState(searchQuery);

	const onUpdateSearch = () => {
		const query = new URLSearchParams(router.query as Record<string, string>);
		query.set("q", search);
		void router.push(`/search?${query}`);
	};

	const onUpdateTag = (tag: string) => {
		const query = new URLSearchParams(router.query as Record<string, string>);
		query.set("tag", tag);
		void router.push(`/search?${query}`);
	};

	const onKeyUpEvent = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === "Enter") onUpdateSearch();
	};

	const goBack = () => void router.back();

	return (
		<div className="px-32 bg-media_search_banner bg-no-repeat bg-center min-h-[600px] pt-52 max-md:px-16 max-sm:px-4">
			{returnButton && (
				<TransparentButton type="button" onClick={goBack} className="pl-0">
					<i className="fa-solid fa-arrow-left-long" /> {t("search:search.button")}
				</TransparentButton>
			)}
			<div className="flex flex-col justify-center w-full gap-4">
				<div>
					<h1 className="text-3xl">{t("search:search.title")}</h1>
					<p className="text-base -mt-2">{t("search:search.description")}</p>
				</div>
				<div className="max-h-[4rem] flex gap-8 w-full">
					<Input
						type="main"
						className="glass backdrop-blur text-base rounded-xl h-16 w-full p-4 outline-2 outline-transparent outline focus:outline-white-600 transition-all placeholder:text-white-600"
						placeholder={t("search:search.search_bar")}
						value={search}
						onChange={(ctx) => setSearch(ctx.currentTarget.value)}
						onKeyUpCapture={onKeyUpEvent}
					/>
					<TransparentButton type="button" onClick={onUpdateSearch} className="glass !w-16 !h-16">
						<i className="fa-solid fa-magnifying-glass text-[20px]" />
					</TransparentButton>
				</div>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag, key) => (
						<TransparentButton
							key={key}
							type="button"
							onClick={() => onUpdateTag(tag.id)}
							className="glass transition-colors border-2 border-transparent hover:border-white-400 hover:text-white"
						>
							<p className="flex gap-1">
								<span className="text-highlight">#</span> {tag.name}
							</p>
						</TransparentButton>
					))}
				</div>
				<div>
					<h2 className="text-lg">{t("search:search.content_type_title")}</h2>
					<div className="flex flex-wrap gap-2 pb-8">
						{SearchTypes.map((type, key) => (
							<TransparentButton
								key={key}
								type="link"
								href={{ query: { ...router.query, type } }}
								className="glass transition-colors border-2 border-transparent hover:border-white-400 hover:!text-white"
							>
								<p className="flex gap-1">{t(`common:content_types.${type}`)}</p>
							</TransparentButton>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBanner;

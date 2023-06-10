import { TransparentButton } from "@creatorhub/buttons";
import { Input, SelectMenu, type SelectOption } from "@creatorhub/forms";
import { useRouter } from "next/router";
import type React from "react";
import { useState } from "react";
import { PageSelector } from "../PageSelector";
import useTranslation from "next-translate/useTranslation";

interface Props {
	tag: string;
	type: string;
	setType: (type: string) => void;

	page: number;
	pages: number;
	setPage: (page: number) => void;
}

const TagBanner: React.FC<Props> = ({ tag, type, setType, page, pages, setPage }) => {
	const { t } = useTranslation();

	const router = useRouter();
	const [search, setSearch] = useState("");
	const searchItem = (bool: boolean) => {
		if (!bool) return;

		const query: Record<string, string> = { ...router.query, q: search, tag };
		delete query.id;

		void router.push({ pathname: "/search", query });
	};

	return (
		<div className="px-32 bg-media_search_banner bg-no-repeat bg-center min-h-[600px] pt-52 max-md:px-16 max-sm:px-4">
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
						onKeyUpCapture={(ev) => searchItem(ev.key === "Enter")}
					/>
					<TransparentButton type="button" onClick={() => searchItem(true)} className="glass !w-16 !h-16">
						<i className="fa-solid fa-magnifying-glass text-[20px]" />
					</TransparentButton>
				</div>
				<div className="flex items-center justify-between">
					<SelectMenu
						type="primary"
						options={[
							{ label: t("common:content_types.video")!, value: "video" },
							{ label: t("common:content_types.image")!, value: "image" }
						]}
						onChange={(ctx) => setType((ctx as SelectOption).value)}
						value={{ label: t(`common:content_types.${type}`)!, value: type }}
					/>
					<PageSelector page={page} pages={pages} setPage={setPage} />
				</div>
			</div>
		</div>
	);
};

export default TagBanner;

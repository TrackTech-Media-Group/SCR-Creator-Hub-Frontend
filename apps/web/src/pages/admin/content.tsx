import type React from "react";
import { Type, getServerSidePropsAdmin } from "@creatorhub/utils";
import { NextSeo } from "next-seo";
import { NextPage } from "next";
import { FilterBar } from "@creatorhub/ui";
import { useState } from "react";
import { AdminNavbar } from "@creatorhub/navbar";
import { AdminCard } from "@creatorhub/cards";
import { useSearch } from "@creatorhub/hooks";

export const getServerSideProps = getServerSidePropsAdmin;

interface Props {
	csrf: string;
}

const AdminContentPage: NextPage<Props> = () => {
	const [query, setQuery] = useState("");
	const [type, setType] = useState<Type>(Type.Image);
	const { content, page, pages, setPage } = useSearch({ query, tag: "", type });

	return (
		<main className="min-h-screen px-32 py-32 max-lg:p-16 max-md:px-4 flex flex-col justify-center items-center">
			<NextSeo title="Content List" />
			<AdminNavbar />
			<div className="w-full">
				<FilterBar page={page} pages={pages} setPage={setPage} setSearch={setQuery} setType={setType} type={type} />
				<div className="flex items-center justify-center gap-2 flex-wrap mt-4">
					{content.map((content) => (
						<AdminCard
							key={content.id}
							src={content.preview}
							alt={content.name}
							title={content.name}
							type={content.type}
							href={`/admin/edit?id=${content.id}`}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

export default AdminContentPage;

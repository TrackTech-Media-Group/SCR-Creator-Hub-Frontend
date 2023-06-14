import type React from "react";
import { createTag, deleteTag, getServerSidePropsAdmin } from "@creatorhub/utils";
import { NextSeo } from "next-seo";
import { NextPage } from "next";
import { AdminDashoardTagsResponse, useAdminServerStats, useAdminTagStats } from "@creatorhub/hooks";
import { PrimaryButton } from "@creatorhub/buttons";
import ms from "ms";
import { ConfirmModal, TagCreateModal } from "@creatorhub/ui";
import { useState } from "react";
import { FormikHelpers } from "formik";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AdminNavbar } from "@creatorhub/navbar";

export const getServerSideProps = getServerSidePropsAdmin;

interface Props {
	csrf: string;
}

const TagButton: React.FC<AdminDashoardTagsResponse & { confirm: () => void }> = (tag) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<PrimaryButton type="button" onClick={() => setIsOpen(true)} className="w-full px-2 py-4 text-left rounded-lg hover:line-through">
			<h3 className="text-lg">{tag.name}</h3>
			<p>
				music: {tag.stats.music} • video: {tag.stats.video} • image: {tag.stats.image}
			</p>
			<ConfirmModal cancel={() => setIsOpen(false)} confirm={tag.confirm} isOpen={isOpen} />
		</PrimaryButton>
	);
};

const AdminDashboardPage: NextPage<Props> = ({ csrf }) => {
	const stats = useAdminServerStats();
	const tags = useAdminTagStats();

	const [tagModal, setTagModal] = useState(false);
	const closeTagModal = () => setTagModal(false);

	const tagCreateOnClick = async (body: any, helpers: FormikHelpers<Record<string, string>>) => {
		try {
			await createTag(body, csrf);
		} catch (error) {
			helpers.setSubmitting(false);

			if (!(error instanceof AxiosError) || !error.response) {
				helpers.setErrors({ name: "Unknown error, please try again later.", id: "Unknown error, please try again later." });
				return;
			}

			const errors = Object.keys(error.response.data)
				.map((key) => ({ [key]: error.response.data[key] }))
				.reduce((a, b) => ({ ...a, ...b }));

			helpers.setErrors(errors);
			return;
		}

		closeTagModal();
	};

	const tagDeleteOnClick = async (id: string) => {
		await toast
			.promise(deleteTag(id, csrf), { error: "Unable to delete the tag", pending: "Deleting the tag...", success: "Tag deleted." })
			.catch(() => void 0);
	};

	return (
		<main className="min-h-screen px-32 py-32 max-lg:p-16 max-md:px-4 flex flex-col justify-center items-center">
			<NextSeo title="Admin Dashboard" />
			<AdminNavbar />
			<TagCreateModal isOpen={tagModal} onClick={closeTagModal} onSubmit={tagCreateOnClick} />

			<div>
				<h1 className="text-3xl">Stats</h1>
				<div className="flex items-center gap-2">
					<div className="p-4 bg-gray-700 rounded-lg w-56">
						<h2 className="text-xl text-center">Cpu</h2>
						<p className="text-base font-light text-center">{stats.cpu.toPrecision(2)}%</p>
					</div>
					<div className="p-4 bg-gray-700 rounded-lg w-56">
						<h2 className="text-xl text-center">Memory</h2>
						<p className="text-base font-light text-center">{(stats.memory.total / stats.memory.usage).toPrecision(2)}%</p>
					</div>
					<div className="p-4 bg-gray-700 rounded-lg w-56">
						<h2 className="text-xl text-center">Uptime</h2>
						<p className="text-base font-light text-center">{ms(stats.uptime * 1e3, { long: true })}</p>
					</div>
				</div>
			</div>

			<div className="mt-8 w-[688px]">
				<h1 className="text-3xl">Tags</h1>
				<div className="flex flex-col items-center gap-2">
					<PrimaryButton type="button" className="w-full" onClick={() => setTagModal(true)}>
						Add Tag
					</PrimaryButton>
					{tags.map((tag, idx) => (
						<TagButton key={idx} confirm={() => tagDeleteOnClick(tag.id)} {...tag} />
					))}
				</div>
			</div>
		</main>
	);
};

export default AdminDashboardPage;

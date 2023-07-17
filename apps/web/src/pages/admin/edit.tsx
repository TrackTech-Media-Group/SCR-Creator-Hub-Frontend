import type React from "react";
import { ContentCreateItem, Tag, deleteContentItem, getServerSidePropsAdmin, updateContentItem } from "@creatorhub/utils";
import { NextSeo } from "next-seo";
import { GetServerSideProps, NextPage } from "next";
import { ConfirmModal, ContentDetailsForm, ContentDownloadsForm, CreateDetails, DownloadDetails, WithLoading } from "@creatorhub/ui";
import { useState } from "react";
import { AdminNavbar } from "@creatorhub/navbar";
import { useContent, useTags } from "@creatorhub/hooks";
import NotFoundPage from "../404";
import { toast } from "react-toastify";
import { TransparentButton } from "@creatorhub/buttons";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id: _id } = ctx.query;
	const id = Array.isArray(_id) ? _id[0] : _id;
	if (!id)
		return {
			notFound: true
		};

	const adminResponse = await getServerSidePropsAdmin(ctx);
	if ("props" in adminResponse) {
		(adminResponse.props as Record<string, any>).id = id;
		return adminResponse;
	}

	return adminResponse;
};

interface Props {
	csrf: string;
	id: string;
}

interface EditComponentProps {
	tags: Tag[];

	details: CreateDetails;
	downloads: DownloadDetails[];

	deleteModal: boolean;
	setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	deleteContent: () => void;

	setDetails: React.Dispatch<CreateDetails>;
	setDownloads: React.Dispatch<DownloadDetails[]>;
}

const EditComponent: React.FC<EditComponentProps> = ({
	tags,
	setDetails,
	setDownloads,
	deleteContent,
	details,
	downloads,
	deleteModal,
	setDeleteModal
}) => {
	const [editDetails, setEditDetails] = useState(true);

	return (
		<>
			<div className="w-full mb-12 flex items-center gap-4">
				<TransparentButton
					type="button"
					data-active={editDetails}
					className="!px-0 !pb-0  data-[active=true]:!text-indigo-900 !text-indigo-700 rounded-none"
					onClick={() => setEditDetails(true)}
				>
					Content Details
				</TransparentButton>
				<TransparentButton
					type="button"
					data-active={!editDetails}
					className="!px-0 !pb-0 data-[active=true]:!text-indigo-900 !text-indigo-700 rounded-none"
					onClick={() => setEditDetails(false)}
				>
					Downloads
				</TransparentButton>
				<TransparentButton type="button" className="!px-0 !pb-0 !text-red-500 rounded-none" onClick={() => setDeleteModal(true)}>
					Delete
				</TransparentButton>
			</div>
			<ConfirmModal cancel={() => setDeleteModal(false)} confirm={deleteContent} isOpen={deleteModal} />
			{editDetails ? (
				<ContentDetailsForm tags={tags} setDetails={setDetails} details={details} />
			) : (
				<ContentDownloadsForm type={details.type} setDownloads={setDownloads} downloads={downloads} />
			)}
		</>
	);
};

const AdminEditPage: NextPage<Props> = ({ id, csrf }) => {
	const { content, loading, refetch } = useContent(id);
	const tags = useTags("force");
	const router = useRouter();

	const [isUploading, setIsUploading] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const updateItem = async (contentChanges: Partial<ContentCreateItem>) => {
		setIsUploading(true);

		await toast
			.promise(updateContentItem(contentChanges, content!.id, csrf), {
				error: "Unable to update the content 😔",
				pending: "Updating the content",
				success: "Content updated!"
			})
			.catch(console.log);

		refetch();
		setIsUploading(false);
	};

	const deleteContent = async () => {
		if (!content) return;

		let failed = false;
		await toast
			.promise(deleteContentItem(content.id, csrf), {
				error: "Unable to delete the content 😔",
				pending: "Deleting the content",
				success: "Content deleted!"
			})
			.catch((err) => {
				console.log(err);
				failed = true;
			});

		setDeleteModal(false);
		if (!failed) void router.push("/admin/content");
	};

	const onDownloadsChange = (downloads: DownloadDetails[]) => {
		void updateItem({ downloads });
	};

	const onDetailsChange = (details: CreateDetails) => {
		if (!content) return;

		const changes: Partial<CreateDetails> = {};
		if (details.name !== content.name) changes.name = details.name;
		if (details.type !== content.type) changes.type = details.type;
		if (details.useCases.join(",") !== content.useCases.join(",")) changes.useCases = details.useCases;
		if (details.tags.map((tag) => tag.id).join(",") !== content.tags.map((tag) => tag.id).join(",")) changes.tags = details.tags;

		void updateItem(changes);
	};

	if (!loading && !content) return <NotFoundPage />;

	return (
		<WithLoading loading={loading || isUploading} className="px-32 py-32 max-lg:p-16 max-md:px-4 flex flex-col justify-center items-center">
			<NextSeo title={`Editing ${content?.name}`} />
			<AdminNavbar />
			{content && (
				<>
					<h1 className="text-5xl font-extrabold text-left w-full">Edit {content.name}</h1>
					<EditComponent
						deleteModal={deleteModal}
						setDeleteModal={setDeleteModal}
						deleteContent={deleteContent}
						details={content}
						downloads={content.downloads.map((download) => ({
							name: download.name,
							url: download.url.replace("mpga", "mp3"),
							isPreview: false
						}))}
						setDetails={onDetailsChange}
						setDownloads={onDownloadsChange}
						tags={tags}
					/>
				</>
			)}
		</WithLoading>
	);
};

export default AdminEditPage;

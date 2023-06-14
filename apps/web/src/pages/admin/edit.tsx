import type React from "react";
import { ContentCreateItem, Tag, Type, createContentItem, deleteContentItem, getServerSidePropsAdmin } from "@creatorhub/utils";
import { NextSeo } from "next-seo";
import { GetServerSideProps, NextPage } from "next";
import { ConfirmModal, ContentDetailsForm, ContentDownloadsForm, CreateDetails, DownloadDetails, WithLoading } from "@creatorhub/ui";
import { useEffect, useState } from "react";
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

	setDetails: React.Dispatch<React.SetStateAction<CreateDetails | undefined>>;
	setDownloads: React.Dispatch<React.SetStateAction<DownloadDetails[]>>;
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
					className="!px-0 !pb-0  data-[active=true]:text-indigo-900 text-indigo-700 rounded-none"
					onClick={() => setEditDetails(true)}
				>
					Content Details
				</TransparentButton>
				<TransparentButton
					type="button"
					data-active={!editDetails}
					className="!px-0 !pb-0 data-[active=true]:text-indigo-900 text-indigo-700 rounded-none"
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
				<ContentDownloadsForm type={Type.Image} setDownloads={setDownloads} downloads={downloads} />
			)}
		</>
	);
};

const AdminEditPage: NextPage<Props> = ({ id, csrf }) => {
	const { content, loading } = useContent(id);
	const tags = useTags();
	const router = useRouter();

	const [details, setDetails] = useState<CreateDetails>();
	const [downloads, setDownloads] = useState<DownloadDetails[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const uploadItem = async () => {
		setIsUploading(true);

		if (!details || !downloads.length) return;
		const content: ContentCreateItem = { ...details, downloads };
		await toast
			.promise(createContentItem(content, csrf), {
				error: "Unable to upload the content 😔",
				pending: "Uploading the content",
				success: "Content uploaded!"
			})
			.catch(console.log);

		setDetails(undefined);
		setDownloads([]);
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

	useEffect(() => {
		if (downloads.length && details && !isUploading) void uploadItem();
	}, [downloads, details, isUploading]);

	if (!loading && !content) return <NotFoundPage />;

	return (
		<WithLoading loading={loading} className="px-32 py-32 max-lg:p-16 max-md:px-4 flex flex-col justify-center items-center">
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
							url: download.url,
							isPreview: false
						}))}
						setDetails={setDetails}
						setDownloads={setDownloads}
						tags={tags}
					/>
				</>
			)}
		</WithLoading>
	);
};

export default AdminEditPage;

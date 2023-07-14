import type React from "react";
import { ContentCreateItem, createContentItem, getServerSidePropsAdmin } from "@creatorhub/utils";
import { NextSeo } from "next-seo";
import { NextPage } from "next";
import { ContentDetailsForm, ContentDownloadsForm, CreateDetails, DownloadDetails, WithLoading } from "@creatorhub/ui";
import { useEffect, useState } from "react";
import { AdminNavbar } from "@creatorhub/navbar";
import { useTags } from "@creatorhub/hooks";
import { toast } from "react-toastify";

export const getServerSideProps = getServerSidePropsAdmin;

interface Props {
	csrf: string;
}

const AdminContentPage: NextPage<Props> = ({ csrf }) => {
	const tags = useTags("force");
	const [details, setDetails] = useState<CreateDetails>();
	const [downloads, setDownloads] = useState<DownloadDetails[]>([]);
	const [isUploading, setIsUploading] = useState(false);

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

	useEffect(() => {
		if (downloads.length && details && !isUploading) void uploadItem();
	}, [downloads, details, isUploading]);

	return (
		<main className="min-h-screen px-32 py-32 max-lg:p-16 max-md:px-4 flex flex-col justify-center items-center">
			<NextSeo title="Upload Content" />
			<AdminNavbar />
			<WithLoading loading={isUploading} className="w-full">
				{details ? (
					<ContentDownloadsForm type={details.type} setDownloads={setDownloads} />
				) : (
					<ContentDetailsForm tags={tags} setDetails={setDetails} />
				)}
			</WithLoading>
		</main>
	);
};

export default AdminContentPage;

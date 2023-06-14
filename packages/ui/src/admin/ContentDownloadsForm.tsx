import { SecondaryButton, TransparentButton } from "@creatorhub/buttons";
import { Input } from "@creatorhub/forms";
import { Type, type Download, HugeUploader, getUploadCredentials } from "@creatorhub/utils";
import { Form, Formik, type FormikProps } from "formik";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { WithLoading } from "../global";

export type DownloadDetails = Omit<Download, "contentId" | "id"> & { isPreview: boolean };
export interface PartialFile {
	name: string;
}

type FormikHelper = FormikProps<{
	downloads: DownloadDetails[];
}>;

interface Props {
	setDownloads: (downloads: DownloadDetails[]) => void;
	downloads?: DownloadDetails[] | undefined;
	type: Type;
}

const placeholderDownloads = [{ name: "", url: "", isPreview: true }];

const createAcceptObject = (type: Type): Record<string, string[]> => {
	switch (type) {
		case Type.Image:
			return {
				"image/jpeg": [".jpeg", ".jpg"],
				"image/png": [".png"],
				"image/bmp": [".bmp"],
				"image/gif": [".gif"]
			};

		case Type.Video:
			return {
				"video/x-flv": [".flv"],
				"video/mp4": [".mp4"],
				"video/quicktime": [".mov"],
				"video/x-msvideo": [".avi"],
				"video/x-ms-wmv": [".wmv"],
				"video/mpeg": [".mpeg", ".mpg"]
			};

		case Type.Music:
			return {
				"audio/mpeg": [".mp2", ".mp3"],
				"audio/vnd.wav": [".wav"]
			};
	}
};

const getFiles = (downloads: DownloadDetails[] | undefined): Record<string, PartialFile | File> => {
	if (!downloads) return {};

	const files = downloads.map((download, idx) => ({ [idx]: { name: download.url } }));
	return files.reduce((a, b) => ({ ...a, ...b })) as Record<string, PartialFile | File>;
};

export const ContentDownloadsForm: React.FC<Props> = ({ setDownloads, downloads, type }) => {
	const [files, setFiles] = useState<Record<string, File | PartialFile>>(getFiles(downloads));

	const removeDownload = (formik: FormikHelper, idx: number) => {
		delete files[idx];
		const updatedFiles = Object.keys(files)
			.map((key, idx) => ({ [idx]: files[key] }))
			.reduce((a, b) => ({ ...a, ...b }));
		setFiles(updatedFiles);

		const downloads = formik.values.downloads.filter((_, key) => key !== idx);
		void formik.setFieldValue("downloads", downloads);
	};

	const updateDownload = (formik: FormikHelper, idx: number, data: Partial<DownloadDetails>) => {
		const download = formik.values.downloads.find((_, key) => key === idx);
		if (!download) return;

		const updatedDownload = { ...download, ...data };
		const downloads = [...formik.values.downloads];
		downloads[idx] = updatedDownload;

		void formik.setFieldValue("downloads", downloads);
	};

	const accept: Record<string, string[]> = createAcceptObject(type);
	const onSubmit = async (data: { downloads: DownloadDetails[] }) => {
		let idx = 0;
		const credentials = await getUploadCredentials();

		for await (const download of data.downloads) {
			const file = files[idx];
			if (!file || !("size" in file)) {
				idx++;
				continue;
			}

			const cdnFileUrl = await new Promise<string | null>((resolve) => {
				const uploader = new HugeUploader({
					endpoint: credentials.endpoint,
					headers: { Authorization: credentials.authorization },
					file,
					postParams: { type: file.type }
				});

				uploader.on("finish", (ev) => resolve(ev.body));
				uploader.on("error", () => resolve(null));
			});

			if (!cdnFileUrl) continue;
			download.url = cdnFileUrl;

			idx++;
		}

		if (!data.downloads.some((download) => download.url)) return;
		setDownloads(data.downloads);
	};

	return (
		<Formik onSubmit={onSubmit} initialValues={{ downloads: downloads || placeholderDownloads }} enableReinitialize>
			{(formik) => (
				<WithLoading loading={formik.isSubmitting} className="w-full">
					<Form className="w-full">
						<div>
							<h1 className="text-3xl font-bold">Step 2: Downloads</h1>
							<p className="text-[12px] mb-4">🚀 = preview, 📦 = not preview</p>
						</div>
						<SecondaryButton
							type="button"
							onClick={() => formik.setFieldValue("downloads", [...formik.values.downloads, { name: "", url: "", isPreview: false }])}
							className="flex items-center gap-2 justify-center w-full mb-4"
						>
							Add Download ☁️
						</SecondaryButton>
						<div className="flex flex-col gap-y-10">
							{formik.values.downloads.map((download, idx) => (
								<div key={idx}>
									<div className="flex items-center justify-between">
										<h2 className="text-xl font-medium mb-2">Name</h2>
										<div className="flex items-center gap-2">
											<TransparentButton type="button" className="!px-0" onClick={() => removeDownload(formik, idx)}>
												❌
											</TransparentButton>
											<TransparentButton
												type="button"
												className="!px-0"
												onClick={() => updateDownload(formik, idx, { isPreview: !download.isPreview })}
											>
												{download.isPreview ? "🚀" : "📦"}
											</TransparentButton>
										</div>
									</div>
									<Input
										id="name"
										type="primary"
										placeholder="The content name"
										className="w-full text-base"
										value={download.name}
										onChange={(ev) => updateDownload(formik, idx, { name: ev.currentTarget.value })}
									/>
									{files[idx] ? (
										<p className="text-base font-normal pt-1">File: {files[idx].name}</p>
									) : (
										<Dropzone accept={accept} onDropAccepted={(file) => setFiles({ ...files, [idx]: file[0] })}>
											{({ getRootProps, getInputProps }) => (
												<section className="border-primary-600 bg-primary-200 cursor-pointer mt-2 border rounded-lg p-2 text-base">
													<div {...getRootProps()}>
														<input {...getInputProps()} />
														<p>Add file 📂</p>
													</div>
												</section>
											)}
										</Dropzone>
									)}
								</div>
							))}

							<SecondaryButton type="button" onClick={formik.submitForm} className="flex items-center gap-2 justify-center">
								Upload 🎉
							</SecondaryButton>
						</div>
					</Form>
				</WithLoading>
			)}
		</Formik>
	);
};

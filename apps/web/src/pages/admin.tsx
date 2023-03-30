import { AdminNavbar } from "@creatorhub/navbar";
import { useSwrWithUpdates } from "@creatorhub/swr";
import { FilterBar, ItemCreateModal, ItemDisplayGrid, ItemsAdmin, TagCreateModal } from "@creatorhub/ui";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import type { FormikHelpers } from "formik";
import type { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HugeUploader from "../lib/HugeUpload";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
	const userSession = getCookie("CH-SESSION", { req: ctx.req, res: ctx.res });
	if (!userSession)
		return {
			props: {},
			notFound: true
		};

	const csrf = await axios.post<{ state: string; token: string }>(`${apiUrl}/user/admin`, undefined, {
		headers: { Authorization: `User ${userSession}` }
	});
	if (!csrf.data.token.length)
		return {
			props: {},
			notFound: true
		};

	const [ext, domain] = apiUrl.replace("http://", "").replace("https://", "").split(".").reverse();
	setCookie("XSRF-TOKEN", csrf.data.token, {
		req: ctx.req,
		res: ctx.res,
		domain: process.env.NODE_ENV === "development" ? undefined : `.${domain}.${ext}`
	});

	return {
		props: { csrf: csrf.data.state }
	};
};

interface Props {
	csrf: string;
}

const Admin: NextPage<Props> = ({ csrf: _initCsrf }) => {
	const [apiKey, setApiKey] = useState("");
	const [csrf, setCsrf] = useState(_initCsrf);
	const [createItem, setCreateItem] = useState(false);
	const [createTag, setCreateTag] = useState(false);

	const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
	const { data: _tags, mutate: tagsMutate } = useSwrWithUpdates<{ id: string; name: string }[]>("/admin/tags");
	useEffect(() => {
		if (_tags) setTags(_tags);
	}, [_tags]);

	const [items, setItems] = useState<ItemsAdmin[]>([]);
	const [itemsPages, setItemsPages] = useState(0);
	const [itemsPage, setItemsPage] = useState(0);
	const [itemsType, setItemsType] = useState("image");
	const [itemsSearch, setItemsSearch] = useState("");
	const { data: _items, mutate: itemsMutate } = useSwrWithUpdates<{ entries: ItemsAdmin[]; pages: number }>(
		`/admin/items?page=${itemsPage}&type=${itemsType}&search=${encodeURIComponent(itemsSearch)}`
	);
	useEffect(() => {
		if (_items) {
			setItems(_items.entries);
			setItemsPages(_items.pages);
		}
	}, [_items]);

	const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

	const deleteTag = (id: string) => {
		const promise = new Promise(async (res, rej) => {
			try {
				const { data } = await axios.delete<{ csrf: string }>(`${apiUrl}/admin/tags/delete`, {
					data: { id },
					withCredentials: true,
					headers: { "XSRF-TOKEN": csrf }
				});

				await tagsMutate((tags ?? []).filter((tag) => tag.id !== id));
				setCsrf(data.csrf);
				res(null);
			} catch (err) {
				console.error(`[DELETE_TAG]: ${err}`);
				rej(err);
			}
		});

		void toast.promise(promise, { pending: "Deleting tag...", error: "Unable to delete the tag :(", success: "Tag deleted." });
	};

	const createTagFn = (
		values: {
			name: string;
			id: string;
		},
		formikHelpers: FormikHelpers<{
			name: string;
			id: string;
		}>
	) => {
		const promise = new Promise(async (res, rej) => {
			try {
				const { data } = await axios.post<{ data: { id: string; name: string }; csrf: string }>(`${apiUrl}/admin/tags/create`, values, {
					withCredentials: true,
					headers: { "XSRF-TOKEN": csrf }
				});

				await tagsMutate([...(tags ?? []), data.data]);
				setCsrf(data.csrf);
				setCreateItem(false);

				res(null);
			} catch (err) {
				const { message } = err?.response?.data ?? {};
				formikHelpers.setErrors(
					Object.keys(values)
						.map((key) => ({ [key]: message ?? "Unknown error, please try again later." }))
						.reduce((a, b) => ({ ...a, ...b }), {})
				);
				formikHelpers.setSubmitting(false);

				console.error(`[CREATE_TAG]: ${err}`);
				rej(err);
			}
		});

		void toast.promise(promise, { pending: "Creating tag...", error: "Unable to create the tag :(", success: "Tag created." });
	};

	const createItemFn = (
		values: {
			name: string;
			type: string;
			tags: string[];
			useCases: string;
			downloads: {
				id: string;
				dimensions: string;
				file: File;
				type: "HD" | "QHD";
			}[];
		},
		formikHelpers: FormikHelpers<{
			name: string;
			type: string;
			tags: string[];
			useCases: string;
			downloads: {
				id: string;
				dimensions: string;
				file: File;
				type: "HD" | "QHD";
			}[];
		}>
	) => {
		const promise =
			values.type === "image"
				? new Promise(async (res, rej) => {
						try {
							const form = new FormData();
							values.downloads.map((d) => d.file).forEach((f) => form.append("upload", f, f.name));

							const downloads = values.downloads.map((d) => ({ name: d.file.name, dimensions: d.dimensions, type: d.type }));
							form.append("data", JSON.stringify({ ...values, downloads, useCases: values.useCases.split(",") }));

							const { data } = await axios.post<{ data: { id: string; name: string }; csrf: string }>(`${apiUrl}/admin/upload`, form, {
								withCredentials: true,
								headers: { "XSRF-TOKEN": csrf },
								onUploadProgress: (ev) => console.log(ev)
							});

							setCsrf(data.csrf);
							setCreateItem(false);

							res(null);
						} catch (err) {
							const { message } = err?.response?.data ?? {};
							formikHelpers.setErrors(
								Object.keys(values)
									.map((key) => ({ [key]: message ?? "Unknown error, please try again later." }))
									.reduce((a, b) => ({ ...a, ...b }), {})
							);
							formikHelpers.setSubmitting(false);

							console.error(`[CREATE_ITEM]: ${err}`);
							rej(err);
						}
				  })
				: new Promise(async (res, rej) => {
						try {
							// eslint-disable-next-line no-alert
							const cdnApiKey = apiKey || prompt(`Please enter your PaperPlane API key:`) || "";
							if (!apiKey) setApiKey(cdnApiKey);

							const download = values.downloads[0].file;
							const downloadUrl = await new Promise<string>((resolve, reject) => {
								const uploader = new HugeUploader({
									endpoint: process.env.NEXT_PUBLIC_CDN_UPLOAD_CHUNK as string,
									file: download,
									postParams: { type: download.type },
									headers: {
										Authorization: cdnApiKey
									}
								});
								uploader.on("finish", (ev) => resolve(ev.body));
								uploader.on("error", (err) => reject(err));
							});

							const correctValues = {
								...values,
								useCases: values.useCases.split(",").filter(Boolean),
								download: {
									url: downloadUrl,
									name: `${values.downloads[0].type} • ${values.downloads[0].dimensions} • ${
										values.downloads[0].file.name.split(".").reverse()[0]
									}`
								}
							};
							const { data } = await axios.post<{ data: { id: string; name: string }; csrf: string }>(
								`${apiUrl}/admin/upload-video`,
								correctValues,
								{
									withCredentials: true,
									headers: { "XSRF-TOKEN": csrf },
									onUploadProgress: (ev) => console.log(ev)
								}
							);

							setCsrf(data.csrf);
							setCreateItem(false);

							res(null);
						} catch (err) {
							const { message } = err?.response?.data ?? {};
							formikHelpers.setErrors(
								Object.keys(values)
									.map((key) => ({ [key]: message ?? "Unknown error, please try again later." }))
									.reduce((a, b) => ({ ...a, ...b }), {})
							);
							formikHelpers.setSubmitting(false);

							console.error(`[CREATE_ITEM]: ${err}`);
							rej(err);
						}
				  });

		void toast.promise(promise, { pending: "Creating item...", error: "Unable to create the item :(", success: "Item created." });
	};

	const updateItemFn = (
		values: {
			id: string;
			name: string;
			type: string;
			tags: string[];
			useCases: string;
			existingDownloads: { id: string; name: string }[];
			downloads: {
				id: string;
				dimensions: string;
				file: File;
				type: "HD" | "QHD";
			}[];
		},
		formikHelpers: FormikHelpers<{
			id: string;
			name: string;
			type: string;
			tags: string[];
			useCases: string;
			existingDownloads: { id: string; name: string }[];
			downloads: {
				id: string;
				dimensions: string;
				file: File;
				type: "HD" | "QHD";
			}[];
		}>
	) => {
		const promise = new Promise(async (res, rej) => {
			try {
				const form = new FormData();
				values.downloads.map((d) => d.file).forEach((f) => form.append("upload", f, f.name));

				const downloads = values.downloads.map((d) => ({ name: d.file.name, dimensions: d.dimensions, type: d.type }));
				form.append("data", JSON.stringify({ ...values, downloads, useCases: values.useCases.split(",") }));

				const { data } = await axios.post<{ data: any; csrf: string }>(`${apiUrl}/admin/items/edit`, form, {
					withCredentials: true,
					headers: { "XSRF-TOKEN": csrf }
				});

				const mutated = items.filter((item) => item.id !== values.id);
				await itemsMutate({ entries: [...mutated, data.data], pages: itemsPages });
				setCsrf(data.csrf);
				res(null);
			} catch (err) {
				const { message } = err?.response?.data ?? {};
				formikHelpers.setErrors(
					Object.keys(values)
						.map((key) => ({ [key]: message ?? "Unknown error, please try again later." }))
						.reduce((a, b) => ({ ...a, ...b }), {})
				);
				formikHelpers.setSubmitting(false);

				console.error(`[UPDATE_ITEM]: ${err}`);
				rej(err);
			}
		});

		void toast.promise(promise, { pending: "Updating item...", error: "Unable to update the item :(", success: "Item updated." });
	};

	const deleteItemFn = (id: string) => {
		const promise = new Promise(async (res, rej) => {
			try {
				const { data } = await axios.delete<{ csrf: string }>(`${apiUrl}/admin/items/edit`, {
					withCredentials: true,
					headers: { "XSRF-TOKEN": csrf },
					data: { id }
				});

				const mutated = items.filter((item) => item.id !== id);
				await itemsMutate({ entries: mutated, pages: itemsPages });
				setCsrf(data.csrf);
				res(null);
			} catch (err) {
				console.error(`[UPDATE_ITEM]: ${err}`);
				rej(err);
			}
		});

		void toast.promise(promise, { pending: "Deleting item...", error: "Unable to delete the item :(", success: "Item deleted." });
	};

	return (
		<div className="min-h-screen">
			<NextSeo title="Admin Dashboard" />
			<ItemCreateModal isOpen={createItem} onClick={() => setCreateItem(false)} tags={tags ?? []} onSubmit={createItemFn} />
			<TagCreateModal isOpen={createTag} onClick={() => setCreateTag(false)} onSubmit={createTagFn} />
			<AdminNavbar
				openCreateItem={() => setCreateItem(true)}
				tags={tags ?? []}
				openCreateTag={() => setCreateTag(true)}
				deleteTag={deleteTag}
			/>
			<FilterBar
				page={itemsPage}
				pages={itemsPages}
				type={itemsType}
				setType={setItemsType}
				setPage={setItemsPage}
				setSearch={setItemsSearch}
			/>
			<ItemDisplayGrid tags={tags} items={items} updateItem={updateItemFn} deleteItem={deleteItemFn} />
		</div>
	);
};

export default Admin;

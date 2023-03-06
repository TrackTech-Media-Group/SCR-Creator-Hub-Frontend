import { AdminNavbar } from "@creatorhub/navbar";
import { useSwrWithUpdates } from "@creatorhub/swr";
import { ItemCreateModal, TagCreateModal } from "@creatorhub/ui";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import type { FormikHelpers } from "formik";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
	const [csrf, setCsrf] = useState(_initCsrf);
	const [createItem, setCreateItem] = useState(false);
	const [createTag, setCreateTag] = useState(false);

	const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
	const { data: _tags, mutate: tagsMutate } = useSwrWithUpdates<{ id: string; name: string }[]>("/admin/tags");
	useEffect(() => {
		if (_tags) setTags(_tags);
	}, [_tags]);

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
		const promise = new Promise(async (res, rej) => {
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
				setCreateTag(false);

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

	return (
		<div>
			<ItemCreateModal isOpen={createItem} onClick={() => setCreateItem(false)} tags={tags ?? []} onSubmit={createItemFn} />
			<TagCreateModal isOpen={createTag} onClick={() => setCreateTag(false)} onSubmit={createTagFn} />
			<AdminNavbar
				openCreateItem={() => setCreateItem(true)}
				tags={tags ?? []}
				openCreateTag={() => setCreateTag(true)}
				deleteTag={deleteTag}
			/>
		</div>
	);
};

export default Admin;

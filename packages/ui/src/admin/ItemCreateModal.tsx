import { Modal } from "@creatorhub/modal";
import type React from "react";
import { Formik, Form } from "formik";
import { array, object, string } from "yup";
import { Input, SelectMenu, SelectOption } from "@creatorhub/forms";
import { PrimaryButton } from "@creatorhub/buttons";
import { PulseLoader } from "react-spinners";
import { FileEntry } from "./FileEntry";
import Dropzone from "react-dropzone";
import { v4 } from "uuid";

interface Props {
	isOpen: boolean;
	tags: { id: string; name: string }[];
	onClick: () => void;
	onSubmit: (...props: any) => void;
}

export const ItemCreateModal: React.FC<Props> = ({ isOpen, onClick, onSubmit, tags }) => {
	const validation = object({
		name: string().required(),
		type: string().required().oneOf(["image", "video"], "Must be type of video or image"),
		tags: array(string()).test({
			test: (arr) => (arr ? arr.every((str) => typeof str === "string" && tags.map((t) => t.id).includes(str)) : false),
			message: "One or more tags do not exist"
		}),
		useCases: array(string()),
		downloads: array(object({ dimensions: string().required(), type: string().required().oneOf(["HD", "QHD"]) })).min(
			1,
			"At least 1 download should be provided"
		)
	});
	return (
		<Modal isOpen={isOpen} onClick={onClick}>
			<h1 className="text-2xl">Create an item</h1>
			<Formik
				validationSchema={validation}
				validateOnMount
				initialValues={{
					name: "",
					type: "image",
					tags: [],
					useCases: [],
					downloads: [] as { id: string; dimensions: string; file: File; type: "HD" | "QHD" }[]
				}}
				onSubmit={onSubmit}
			>
				{(formik) => (
					<Form className="flex flex-col gap-2 w-[30rem] max-h-[75vh] overflow-y-auto">
						<div className="w-full">
							<h2 className="text-lg">Name</h2>
							<Input
								type="primary"
								className="w-full"
								placeholder="Name of the item here..."
								value={formik.values.name}
								onChange={(ev) => formik.setFieldValue("name", ev.currentTarget.value)}
							/>
							<p className="text-red-500 text-base">{formik.errors.name && `* ${formik.errors.name}`}&#8203;</p>
						</div>
						<div className="w-full">
							<h2 className="text-lg mb-1">Type</h2>
							<SelectMenu
								type="primary"
								className="w-full"
								options={[
									{ label: "image", value: "image" },
									{ label: "video", value: "video" }
								]}
								value={{ label: formik.values.type, value: formik.values.type }}
								onChange={(opt) => formik.setFieldValue("type", (opt as SelectOption).value)}
							/>
							<p className="text-red-500 text-base">{formik.errors.type && `* ${formik.errors.type}`}&#8203;</p>
						</div>
						<div className="w-full">
							<h2 className="text-lg mb-1">tags</h2>
							<SelectMenu
								type="primary"
								className="w-full"
								isMulti
								options={tags.map((t) => ({ label: t.name, value: t.id }))}
								value={
									formik.values.tags
										.map((id) => tags.find((t) => t.id === id))
										.filter(Boolean)
										.map((t) => ({ label: t!.name, value: t!.id })) as SelectOption[]
								}
								onChange={(opt) =>
									formik.setFieldValue(
										"tags",
										(opt as SelectOption[]).map((t) => t.value)
									)
								}
							/>
							<p className="text-red-500 text-base">{formik.errors.tags && `* ${formik.errors.tags}`}&#8203;</p>
						</div>
						<div className="w-full">
							<h2 className="text-lg">Use cases</h2>
							<Input
								type="primary"
								className="w-full"
								placeholder="Separated with a comma: presentation,banner,thumbnail"
								value={formik.values.useCases}
								onChange={(ev) => formik.setFieldValue("useCases", ev.currentTarget.value)}
							/>
							<p className="text-red-500 text-base">{formik.errors.useCases && `* ${formik.errors.useCases}`}&#8203;</p>
						</div>
						<div className="w-full">
							<h2 className="text-lg">Downloads</h2>
							<Dropzone
								onDrop={(acceptedFiles) =>
									formik.setFieldValue("downloads", [
										...formik.values.downloads,
										...acceptedFiles.map((file) => ({ id: v4(), type: "HD", file, dimensions: "" }))
									])
								}
							>
								{({ getRootProps, getInputProps }) => (
									<section className="border-white-200 border rounded-md p-2 text-base">
										<div {...getRootProps()}>
											<input {...getInputProps()} />
											<p>Add files...</p>
										</div>
									</section>
								)}
							</Dropzone>
							{formik.values.downloads.map((value, key) => (
								<FileEntry
									key={key}
									value={value}
									file={value.file}
									setFieldValue={(v) =>
										formik.setFieldValue("downloads", [
											...formik.values.downloads.filter((download) => download.id !== value.id),
											v
										])
									}
								/>
							))}
							<p className="text-red-500 text-base">
								{formik.errors.downloads && `* ${typeof formik.errors.downloads === "string" ? formik.errors.downloads : ""}`}
								&#8203;
							</p>
						</div>
						<PrimaryButton type="button" onClick={formik.handleSubmit} disabled={formik.isSubmitting || !formik.isValid}>
							{formik.isSubmitting ? <PulseLoader size={15} color="#fff" /> : "Submit"}
						</PrimaryButton>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

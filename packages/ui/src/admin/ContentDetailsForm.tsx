import { SecondaryButton } from "@creatorhub/buttons";
import { Input, SelectMenu } from "@creatorhub/forms";
import type { SelectOption } from "@creatorhub/forms";
import { Type, type Content, type Tag } from "@creatorhub/utils";
import { Form, Formik } from "formik";
import React from "react";
import { array, object, string } from "yup";

export type CreateDetails = Omit<Content, "downloads" | "id" | "preview">;

interface Props {
	tags: Tag[];

	details?: CreateDetails;
	setDetails: (details: CreateDetails) => void;
}

const placeholderDetails: CreateDetails = { name: "", tags: [], type: Type.Image, useCases: [] };

export const ContentDetailsForm: React.FC<Props> = ({ setDetails, tags, details = placeholderDetails }) => {
	const onSubmit = (data: CreateDetails) => setDetails(data);
	const getTags = (options: SelectOption[]) => options.map((option) => ({ id: option.value, name: option.label }));
	const getUseCases = (ev: React.ChangeEvent<HTMLInputElement>) => ev.currentTarget.value.split(/,/g).map((str) => str.trim());

	const validationSchema = object({
		name: string().required("Name is required"),
		tags: array(
			object({
				name: string().required(),
				id: string().required()
			})
		).test({ test: (values) => values?.every((value) => tags.map((tag) => tag.id).includes(value.id)), message: "Invalid tags provided" }),
		type: string()
			.oneOf(Object.keys(Type).map((key) => Type[key as keyof typeof Type]))
			.required(),
		useCases: array(string())
	});

	return (
		<Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={details} enableReinitialize>
			{(formik) => (
				<Form className="w-full">
					<h1 className="text-3xl font-bold">Step 1: Content Details</h1>
					<div className="flex flex-col gap-y-10">
						<div>
							<h2 className="text-xl font-medium mb-2">Name</h2>
							<Input
								id="name"
								type="primary"
								placeholder="The content name"
								className="w-full text-base"
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
							{formik.errors.name && <p className="text-red-500">* {formik.errors.name}</p>}
						</div>
						<div>
							<h2 className="text-xl font-medium mb-2">Type</h2>
							<SelectMenu
								options={Object.keys(Type).map((type) => ({ value: Type[type as keyof typeof Type], label: type }))}
								type="primary"
								className="w-full text-base"
								value={{ value: formik.values.type, label: formik.values.type }}
								onChange={(value) => formik.setFieldValue("type", (value as SelectOption).value)}
							/>
							{formik.errors.type && <p className="text-red-500">* {formik.errors.type}</p>}
						</div>
						<div>
							<h2 className="text-xl font-medium mb-2">Tags</h2>
							<SelectMenu
								isMulti
								options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
								type="primary"
								className="w-full text-base"
								value={formik.values.tags.map((tag) => ({ label: tag.name, value: tag.id }))}
								onChange={(value) => formik.setFieldValue("tags", getTags((value || []) as SelectOption[]))}
							/>
							{formik.errors.tags && (
								<p className="text-red-500">
									* {Array.isArray(formik.errors.tags) ? formik.errors.tags.join(", ") : formik.errors.tags}
								</p>
							)}
						</div>
						<div>
							<h2 className="text-xl font-medium mb-2">Use cases</h2>
							<Input
								type="primary"
								placeholder="A list of use-cases separated by a comma (,)"
								className="w-full text-base"
								value={formik.values.useCases.join(",")}
								onChange={(ev) => formik.setFieldValue("useCases", getUseCases(ev))}
							/>
							{formik.errors.useCases && <p className="text-red-500">* {formik.errors.useCases}</p>}
						</div>
						<SecondaryButton type="button" onClick={formik.submitForm} disabled={!formik.isValid}>
							{details ? "Update 🚀" : "Continue"}
						</SecondaryButton>
					</div>
				</Form>
			)}
		</Formik>
	);
};

import { Modal } from "@creatorhub/modal";
import type React from "react";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { Input } from "@creatorhub/forms";
import { PrimaryButton } from "@creatorhub/buttons";
import { PulseLoader } from "react-spinners";

interface Props {
	isOpen: boolean;
	onClick: () => void;
	onSubmit: (...props: any) => void;
}

export const TagCreateModal: React.FC<Props> = ({ isOpen, onClick, onSubmit }) => {
	const validation = object({
		name: string().required(),
		id: string()
			.required()
			.lowercase()
			.test({ test: (str) => (str ? !str.includes(" ") : false), message: "Id cannot have spaces" })
	});
	return (
		<Modal isOpen={isOpen} onClick={onClick}>
			<h1 className="text-2xl">Create a tag</h1>
			<Formik validationSchema={validation} validateOnMount initialValues={{ name: "", id: "" }} onSubmit={onSubmit}>
				{(formik) => (
					<Form className="flex flex-col gap-2 w-80">
						<div className="w-full">
							<h2 className="text-lg">Name</h2>
							<Input
								type="primary"
								className="w-full"
								value={formik.values.name}
								onChange={(ev) => {
									formik.setFieldValue("name", ev.currentTarget.value);
									formik.setFieldValue("id", ev.currentTarget.value.replace(/ +/g, "-").toLowerCase());
								}}
							/>
							<p className="text-red-500 text-base">{formik.errors.name && `* ${formik.errors.name}`}&#8203;</p>
						</div>
						<div className="w-full">
							<h2 className="text-lg">Id</h2>
							<Input
								type="primary"
								className="w-full"
								value={formik.values.id}
								onChange={(ev) => formik.setFieldValue("id", ev.currentTarget.value)}
							/>
							<p className="text-red-500 text-base">{formik.errors.id && `* ${formik.errors.id}`}&#8203;</p>
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

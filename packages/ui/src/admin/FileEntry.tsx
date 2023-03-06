import { SelectMenu, SelectOption, Input } from "@creatorhub/forms";
import type React from "react";

interface Props {
	file: File;
	value: { type: "QHD" | "HD"; dimensions: string; id: string };
	setFieldValue: (value: { type: "QHD" | "HD"; dimensions: string; id: string }) => void;
}

export const FileEntry: React.FC<Props> = ({ file, value, setFieldValue }) => {
	return (
		<div className="flex items-center justify-between">
			<SelectMenu
				options={[
					{ value: "QHD", label: "QHD" },
					{ value: "HD", label: "HD" }
				]}
				type="primary"
				className="w-fit"
				onChange={(opt) => setFieldValue({ ...value, type: (opt as SelectOption).value as any })}
			/>
			<Input
				type="primary"
				className="w-3/5"
				placeholder="Dimensions of the file: 1080x720 (width x height)"
				value={value.dimensions}
				onChange={(ctx) => setFieldValue({ ...value, dimensions: ctx.currentTarget.value })}
			></Input>
			<p className="text-base">{file.name.split(".").reverse()[0]}</p>
		</div>
	);
};

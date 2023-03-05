import type React from "react";
import { getCleanProps, InputStyles } from "../index";

interface InputProps {
	type: keyof typeof InputStyles;
	formType?: React.HTMLInputTypeAttribute;
}

type Props = React.InputHTMLAttributes<HTMLInputElement> & InputProps;

export const Input: React.FC<Props> = (props) => {
	const style = InputStyles[props.type];

	return (
		<>
			<input
				className={`${
					props.className ?? ""
				} ${style} border rounded-xl px-4 py-2 outline-2 outline-transparent outline transition-all placeholder:text-white-600`}
				{...getCleanProps(props)}
				type={props.formType}
			/>
		</>
	);
};

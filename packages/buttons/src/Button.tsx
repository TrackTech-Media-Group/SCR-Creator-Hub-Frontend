import type React from "react";
import Link from "next/link";

interface ButtonPropsColor {
	type: "button";
	onClick?: () => void;
	color: Colors;
	extra?: string;
}

interface LinkPropsColor {
	type: "link";
	href: string;
	target?: string;
	color: Colors;
	extra?: string;
}

type Colors = keyof typeof Colors;
type AllPropsWithColor = ButtonPropsColor | LinkPropsColor;

export type LinkProps = Omit<LinkPropsColor, "color">;
export type ButtonProps = Omit<ButtonPropsColor, "color">;
export type AllProps = LinkProps | ButtonProps;

const Colors = {
	primary: {
		bg: "bg-primary",
		hoverBg: "hover:bg-primary-500"
	},
	secondary: {
		bg: "bg-secondary",
		hoverBg: "hover:bg-secondary-500"
	},
	tertiary: {
		bg: "bg-highlight",
		hoverBg: "hover:bg-highlight-500"
	},
	white: {
		bg: "bg-white",
		hoverBg: "hover:bg-white-500"
	},
	transparent: {
		bg: "bg-transparent px-2 py-0",
		hoverBg: "hover:text-white-500"
	}
};

const Button: React.FC<React.PropsWithChildren<AllPropsWithColor>> = (props) => {
	const El = (props.type === "link" ? Link : (props: any) => <button {...props} />) as React.FC<any>;
	const colors = Colors[props.color];

	return (
		<El
			className={`${props.extra ?? ""} ${colors.bg} text-white px-4 py-2 rounded-xl text-base ${colors.hoverBg} transition-colors`}
			{...props}
		/>
	);
};

export default Button;

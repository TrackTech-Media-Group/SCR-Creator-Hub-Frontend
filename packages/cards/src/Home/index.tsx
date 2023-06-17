import Link from "next/link";
import React from "react";
import { Label } from "./Label";
import { BaseCard, type CardProps } from "../BaseCard";
import type { Url } from "next/dist/shared/lib/router/router";

type Props = CardProps & { href: Url };

export const HomeCard: React.FC<Props> = (props) => {
	return (
		<Link href={props.href}>
			<BaseCard {...props}>
				<Label type={props.type} />
			</BaseCard>
		</Link>
	);
};

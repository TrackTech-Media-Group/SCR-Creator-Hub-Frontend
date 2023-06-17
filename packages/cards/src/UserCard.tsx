import React from "react";
import { type CardProps, BaseCard } from "./BaseCard";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

type Props = CardProps & { href: Url };

export const UserCard: React.FC<Props> = (props) => {
	return (
		<Link href={props.href}>
			<BaseCard {...props} />
		</Link>
	);
};

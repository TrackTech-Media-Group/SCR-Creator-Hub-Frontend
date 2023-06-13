import React from "react";
import { BaseNavbar } from "./BaseNavbar";
import { TransparentButton } from "@creatorhub/buttons";

export const AdminNavbar: React.FC = () => {
	return (
		<BaseNavbar logoHref="/admin">
			<div className="flex items-center gap-8">
				<TransparentButton type="link" href="/admin/content" className="!py-0">
					Content
				</TransparentButton>
				<TransparentButton type="link" href="/admin/create" className="!py-0">
					Upload
				</TransparentButton>
			</div>
		</BaseNavbar>
	);
};

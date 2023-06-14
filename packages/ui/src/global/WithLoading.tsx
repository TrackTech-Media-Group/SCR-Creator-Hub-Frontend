import React from "react";
import { PulseLoader } from "react-spinners";

interface Props {
	loading: boolean;
	className?: string;
}

export const WithLoading: React.FC<React.PropsWithChildren<Props>> = ({ loading, children, className }) => {
	return (
		<main className={`min-h-screen ${className ?? ""}`}>
			{loading ? (
				<div className="h-screen grid place-items-center rotate-90">
					<PulseLoader size={15} color="#fff" />
				</div>
			) : (
				children
			)}
		</main>
	);
};

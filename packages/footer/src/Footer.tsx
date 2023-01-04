import type React from "react";

export const Footer: React.FC = () => {
	return (
		<div className="bg-black w-full mt-24 flex flex-col justify-center items-center p-8">
			<div>links</div>
			<div className="flex flex-col justify-center items-center">
				<img className="w-80" src="/logo/track-tech.png" alt="Track Tech logo" />
				<p className="text-base">© TrackTech Media Group 2023</p>
			</div>
		</div>
	);
};

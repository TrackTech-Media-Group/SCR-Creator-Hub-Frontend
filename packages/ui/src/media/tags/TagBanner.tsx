import { SelectMenu, SelectOption } from "@creatorhub/forms";
import type React from "react";

interface Props {
	type: string;
	setType: (type: string) => void;
}

const TagBanner: React.FC<Props> = ({ type, setType }) => {
	return (
		<div className="px-32 bg-media_search_banner bg-no-repeat bg-center min-h-[600px] pt-52 max-md:px-16 max-sm:px-4">
			<div className="flex flex-col justify-center w-full gap-4">
				<div>
					<h1 className="text-3xl">Explore our library</h1>
					<p className="text-base -mt-2">Filter your results below to get more accurate results.</p>
				</div>
				<div className="flex items-center gap-2">
					<SelectMenu
						type="primary"
						options={[
							{ label: "Video", value: "video" },
							{ label: "Image", value: "image" }
						]}
						onChange={(ctx) => setType((ctx as SelectOption).value)}
						value={{ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }}
					/>
				</div>
			</div>
		</div>
	);
};

export default TagBanner;

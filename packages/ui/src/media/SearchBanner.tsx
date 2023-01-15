import { TransparentButton } from "@creatorhub/buttons";
import { Input } from "@creatorhub/forms";
import type React from "react";

const SearchBanner: React.FC = () => {
	return (
		<div className="px-32 bg-media_search_banner bg-no-repeat bg-center min-h-[512px] grid place-items-center max-md:px-16 max-sm:px-4">
			<div className="flex flex-col justify-center w-full gap-4">
				<div>
					<h1 className="text-3xl">Explore our library</h1>
					<p className="text-base -mt-2">Use the search bar or select one of many tags to get more specific results.</p>
				</div>
				<div className="max-h-[4rem] flex gap-8 w-full">
					<Input
						className="glass backdrop-blur text-base rounded-xl h-16 w-full p-4 outline-2 outline-transparent outline focus:outline-white-600 transition-all placeholder:text-white-600"
						placeholder="I am looking for..."
					/>
					<TransparentButton type="button" className="glass !w-16 !h-16">
						<i className="fa-solid fa-magnifying-glass text-base" />
					</TransparentButton>
				</div>
			</div>
		</div>
	);
};

export default SearchBanner;

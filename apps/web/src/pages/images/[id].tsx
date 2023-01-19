import { PrimaryButton, TransparentButton, WhiteButton } from "@creatorhub/buttons";
import { MediaDetailsLayout } from "@creatorhub/ui";
import { useState } from "react";

export default function ImageDetail() {
	const [showFullImage, setShowFullImage] = useState(false);

	return (
		<MediaDetailsLayout>
			<div className={`relative w-full overflow-hidden ${showFullImage ? "h-auto" : "h-96"} grid place-items-center rounded-xl max-md:hidden`}>
				<img src={"/cards_placeholder_image.png"} alt="placeholder_image preview" className="rounded-xl" />
				{!showFullImage && (
					<>
						<PrimaryButton type="button" onClick={() => setShowFullImage(true)} className="absolute bottom-2 z-10">
							Show full image
						</PrimaryButton>
						<div className="bg-gradient-to-t from-main absolute bottom-0 w-full h-full" />
					</>
				)}
			</div>
			<div className="rounded-xl max-md:block md:hidden">
				<img src={"/cards_placeholder_image.png"} alt="placeholder_image preview" className="rounded-xl" />
			</div>
			<div className="w-full flex flex-col justify-center gap-2">
				<div className="flex justify-between items-center mt-8 max-md:-mt-4">
					<h1 className="text-subtitle max-lg:text-3xl max-md:text-2xl max-sm:text-xl">Waterline Newry Harbour</h1>
					<TransparentButton type="button">
						<i className="fa-solid fa-bookmark text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg" />
					</TransparentButton>
				</div>
				<div className="w-full flex gap-2 items-center flex-wrap">
					{["Station", "Train", "Misc"].map((tag, key) => (
						<TransparentButton
							key={key}
							type="link"
							href={`/tags/${tag.toLowerCase()}`}
							className="glass transition-colors border-2 border-transparent hover:border-white-400 hover:text-white"
						>
							<p className="flex gap-1">
								<span className="text-highlight">#</span> {tag}
							</p>
						</TransparentButton>
					))}
				</div>
			</div>
			<div>
				<h2 className="text-xl">Downloads</h2>
				<div className="flex items-center gap-4 flex-wrap">
					<WhiteButton type="button" className="border-white-400 border hover:border-white-800">
						HD • 1080x720 • PNG
					</WhiteButton>
					<WhiteButton type="button" className="border-white-400 border hover:border-white-800">
						HD • 1080x720 • JPG
					</WhiteButton>
					<WhiteButton type="button" className="border-white-400 border hover:border-white-800">
						SD • 852x480 • JPG
					</WhiteButton>
				</div>
			</div>
			<div>
				<h2 className="text-xl">Use cases</h2>
				<p className="text-base">Thumbnail, banner, background, slideshow</p>
			</div>
			<div className="w-1/2 max-lg:w-3/4 max-md:w-full">
				<h2 className="text-xl">Contribution</h2>
				<p className="text-base">
					To make sure that SCR Creators Hub keeps running, we kindly ask you to put the following text under the image or in the
					description of your video/post:
				</p>
				<div className="mt-4">
					<h3 className="text-lg">Description</h3>
					<div className="bg-grey p-2 rounded-xl relative mt-1">
						<p className="text-base pr-12">Some content in this post/video was provided by SCR Creators Hub: https://scrcreate.app/</p>
						<TransparentButton type="button" className="absolute top-0 right-0">
							<i className="fa-solid fa-copy" />
						</TransparentButton>
					</div>
				</div>
				<div className="mt-4">
					<h3 className="text-lg">Other</h3>
					<div className="bg-grey p-2 rounded-xl relative mt-1">
						<p className="text-base pr-12">Content from SCR Creators Hub: https://scrcreate.app/</p>
						<TransparentButton type="button" className="absolute top-0 right-0">
							<i className="fa-solid fa-copy" />
						</TransparentButton>
					</div>
				</div>
			</div>
		</MediaDetailsLayout>
	);
}

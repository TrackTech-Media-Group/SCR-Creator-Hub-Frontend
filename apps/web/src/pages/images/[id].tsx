import { PrimaryButton, TransparentButton } from "@creatorhub/buttons";
import { MediaDetailsLayout } from "@creatorhub/ui";
import { useState } from "react";

export default function ImageDetail() {
	const [showFullImage, setShowFullImage] = useState(false);

	return (
		<MediaDetailsLayout>
			<div className={`relative w-full overflow-hidden ${showFullImage ? "h-auto" : "h-96"} grid place-items-center rounded-xl`}>
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
			<div className="w-full flex flex-col justify-center gap-2">
				<div className="flex justify-between items-center mt-8">
					<h1 className="text-subtitle">Waterline Newry Harbour</h1>
					<TransparentButton type="button">
						<i className="fa-solid fa-bookmark text-3xl" />
					</TransparentButton>
				</div>
				<div className="w-full flex gap-2 items-center">
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
				<div>
					<h2 className="text-xl">Downloads</h2>
				</div>
			</div>
		</MediaDetailsLayout>
	);
}

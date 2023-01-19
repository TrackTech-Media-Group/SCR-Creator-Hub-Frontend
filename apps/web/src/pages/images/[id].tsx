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
			<div className="flex justify-between items-center mt-8">
				<h1 className="text-title">Waterline Newry Harbour</h1>
				<TransparentButton type="button">
					<i className="fa-solid fa-bookmark text-subtitle" />
				</TransparentButton>
			</div>
		</MediaDetailsLayout>
	);
}

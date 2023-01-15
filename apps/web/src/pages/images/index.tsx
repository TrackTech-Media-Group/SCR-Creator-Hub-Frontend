import { HomeCard } from "@creatorhub/cards";
import { MediaLayout } from "@creatorhub/ui";

export default function ImagesHome() {
	return (
		<MediaLayout>
			<h1 className="text-3xl text-center">See what&apos;s trending</h1>
			<div className="flex flex-wrap gap-4 justify-center">
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
				<HomeCard type="video" alt="cards_placeholder_image" src="/cards_placeholder_image.png" href="/images/cards_placeholder_image.png" />
			</div>
		</MediaLayout>
	);
}

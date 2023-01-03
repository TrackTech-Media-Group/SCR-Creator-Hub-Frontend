import { SecondaryButton } from "@creatorhub/buttons";
import { HomeCard } from "@creatorhub/cards";
import { HomeNavbar } from "@creatorhub/navbar";

export default function Web() {
	return (
		<>
			<HomeNavbar />
			<div className="px-32 max-md:px-4 min-h-screen bg-home_header bg-no-repeat bg-[right_top] max-lg:bg-home_header_lg max-md:bg-home_header_md">
				<div className="py-[232px] flex flex-col gap-20 max-md:py-[146px]">
					<div>
						<h1 className="text-title max-md:text-subtitle max-md:!font-bold">SCR Creators,</h1>
						<h2 className="text-subtitle max-md:text-4xl">You’re in the right place.</h2>
					</div>
					<div className="flex flex-col gap-7">
						<h2 className="text-subtitle max-w-xl max-md:text-4xl">
							Hundreds of assets, accessible in <strong className="text-highlight font-semibold">seconds</strong>
						</h2>
						<SecondaryButton type="link" href="/login" extra="w-fit">
							Get Started
						</SecondaryButton>
					</div>
				</div>
				<div className="mt-24 flex flex-col justify-center items-center gap-8">
					<h1 className="text-3xl w-fit">Explore Popular Content</h1>
					<div className="flex flex-wrap gap-4 justify-center">
						<HomeCard
							type="video"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="video"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="image"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="video"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="video"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="video"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="image"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="video"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="image"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="video"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="image"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
						<HomeCard
							type="image"
							alt="cards_placeholder_image"
							src="/cards_placeholder_image.png"
							href="/images/cards_placeholder_image.png"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

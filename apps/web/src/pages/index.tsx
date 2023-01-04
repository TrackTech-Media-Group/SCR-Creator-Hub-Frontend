import { SecondaryButton } from "@creatorhub/buttons";
import { HomeCard } from "@creatorhub/cards";
import { HomeNavbar } from "@creatorhub/navbar";
import Marquee from "react-fast-marquee";

export default function Web() {
	return (
		<>
			<HomeNavbar />
			<div className="px-32 max-md:px-4 min-h-screen bg-home_header bg-no-repeat bg-[right_top] max-lg:bg-home_header_lg max-md:bg-home_header_md flex flex-col justify-center items-center">
				<div className="py-[232px] flex flex-col gap-20 max-md:py-[146px] mr-auto">
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
				<div className="w-[calc(100vw-1.1rem)] overflow-hidden my-48">
					<Marquee className="h-28" gradient={false} direction="left">
						{["images", "time", "grow", "quality", "free", "videos", "library"].map((str, key) => (
							<p className="text-8xl font-semibold mx-8" key={key}>
								{str}
							</p>
						))}
					</Marquee>
					<Marquee className="h-28" gradient={false} direction="right">
						{["images", "time", "grow", "quality", "free", "videos", "library"].map((str, key) => (
							<p className="text-8xl font-semibold mx-8" key={key}>
								{str}
							</p>
						))}
					</Marquee>
				</div>
				<div className="max-w-[68rem] flex flex-col justify-center items-center">
					<h1 className="text-3xl w-fit mb-4">Work smarter, not harder</h1>
					<ul className="columns-2 max-lg:columns-1">
						<li className="max-w-[32rem] flex justify-between items-center gap-8 mb-4">
							<i className="fa-solid fa-clock text-title" />
							<div>
								<h1 className="text-xl">Save Time</h1>
								<p className="text-base">
									Forget hours of recording footage and searching for the perfect image. With SCR Creator Hub, you can find all you
									need and more in seconds.
								</p>
							</div>
						</li>
						<li className="max-w-[32rem] flex justify-between items-center gap-8">
							<i className="fa-solid fa-signal text-title" />
							<div>
								<h1 className="text-xl">Ensure Quality</h1>
								<p className="text-base">
									We record all our footage on a cutting edge system so everyone can enjoy smooth framerates with beautiful full
									graphic settings.
								</p>
							</div>
						</li>
						<li className="max-w-[32rem] flex justify-between items-center gap-8 mb-4">
							<i className="fa-solid fa-box-open text-title" />
							<div>
								<h1 className="text-xl">Adaptable</h1>
								<p className="text-base">
									Our footage is made to be adaptable to your specific needs. Did you know we have pre-blured videos for video essay
									backgrounds?
								</p>
							</div>
						</li>
						<li className="max-w-[32rem] flex justify-between items-center gap-8">
							<i className="fa-solid fa-circle-dollar-to-slot text-title" />
							<div>
								<h1 className="text-xl">Free Forever</h1>
								<p className="text-base">
									No subscriptions. No hidden fees. No sneaky business practices. We want to help you, the community, not our
									pockets.
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div className="w-full mt-24">
					<div className="w-full absolute left-0 overflow-hidden grid place-items-center">
						<img className="min-h-[38rem] w-fit object-cover" src="/backgrounds/home_conclusion_image.png" alt="conclusion background" />
					</div>
					<div className="mt-[38rem] flex flex-col justify-center items-center">
						<h1 className="text-3xl text-center leading-10 mb-4">The new way of content creation.</h1>
						<p className="text-base max-w-[38rem] text-center">
							Make everything less boring, focus on the important stuff. Login with your Discord account and get access to hundreds of
							assets.
						</p>
						<SecondaryButton type="link" href="/login" extra="rounded-full mt-8">
							Sign in <i className="fa-solid fa-arrow-right-long ml-4" />
						</SecondaryButton>
					</div>
				</div>
			</div>
		</>
	);
}

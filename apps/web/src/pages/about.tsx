import { HomeNavbar } from "@creatorhub/navbar";

export default function About() {
	return (
		<>
			<HomeNavbar />
			<div className="px-32 max-md:px-4 min-h-screen flex flex-col justify-center items-center">
				<div className="max-w-[750px] px-4">
					<div className="flex flex-col gap-2">
						<h1 className="text-title">About Us</h1>
						<p className="text-base">
							We&apos;re TrackTech, and our goal is to provide content creators of all types equal opportunities to express themselves
							freely, without the limitation of money, time, etc. All our services are 100% free. No hidden costs, no premium.
						</p>
						<p className="text-base mt-4">
							We provide services in many sectors of content creation, from graphic design to videos. The majority of our work is Roblox
							related.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

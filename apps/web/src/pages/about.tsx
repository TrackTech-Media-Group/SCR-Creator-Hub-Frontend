import { HomeNavbar } from "@creatorhub/navbar";

export default function About() {
	return (
		<>
			<HomeNavbar />
			<div className="px-32 pt-40 max-md:px-4 min-h-screen flex flex-col justify-center items-center">
				<div className="max-w-[750px] px-4 flex flex-col gap-8">
					<div className="flex flex-col gap-2 justify-center items-center text-center">
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
					<div className="flex flex-col gap-4 justify-center items-center text-center">
						<h1 className="text-xl">Projects</h1>
						<div className="flex flex-col items-center">
							<img src="/projects/trackmesh.png" alt="TrackMesh logo" />
							<p className="text-base">
								The future of models on Roblox. Using advanced 3D scanning photogrammetry, in combination with the TrackMesh API,
								creates unreal models that push the Roblox engine to it&apos;s limits.
							</p>
						</div>
						<div className="flex flex-col items-center">
							<img src="/projects/captions.png" alt="Captions by TrackTech logo" />
							<p className="text-base">
								Captions By TrackTech (previously TrackCC) is a smart captioning service for content creators.
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-4 justify-center items-center text-center">
						<h1 className="text-xl">Partners</h1>
						<div>
							<img src="/partners/bantech.png" alt="Bantech logo" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

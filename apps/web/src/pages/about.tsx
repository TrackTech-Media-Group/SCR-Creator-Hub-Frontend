import { HomeNavbar } from "@creatorhub/navbar";

export default function About() {
	return (
		<>
			<HomeNavbar />
			<div className="px-32 pt-40 max-md:px-4 min-h-screen flex flex-col justify-center items-center">
				<div className="max-w-[920px] px-4 flex flex-col gap-32">
					<div className="flex flex-col gap-2 justify-center">
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
					<div>
						<h1 className="text-xl mb-8">Meet the team</h1>
						<div className="flex flex-col gap-16 justify-center">
							<div className="flex items-center gap-12 w-full">
								<img src="/team/onetrackminded.png" alt="OneTrackMinded avatar" className="rounded-full w-80" />
								<div className="max-w-[550px]">
									<div className="text-xl">
										<h1 className="font-bold">OneTrackMinded</h1>
										<h2 className="font-medium -mt-2">CEO and Founder</h2>
									</div>
									<div className="text-base flex flex-col gap-3">
										<p>
											Founder of TrackTech in 2018 (previously known as OneTrackBots). and has been leading the company forward
											ever since.
										</p>
										<p>He has a vision to allow anyone to express their full creative potential without the worry of money.</p>
										<p>
											OneTrackMinded has experience in graphics design, community management, HTML, CSS, BDScript and project
											management.
										</p>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-12 w-full">
								<img
									src="https://avatars.githubusercontent.com/u/65551719?v=4"
									alt="Daan Klarenbeek: profile picture"
									className="rounded-full w-80"
								/>
								<div className="max-w-[550px]">
									<div className="text-xl">
										<h1 className="font-bold">Daan Klarenbeek</h1>
										<h2 className="font-medium -mt-2">Leading Developer</h2>
									</div>
									<div className="text-base flex flex-col gap-3">
										<p>
											Daan has been dabaling around in coding since early 2020. He is now a full stack developer, and works as
											TrackTech&apos;s lead developer.
										</p>
										<p>
											He has mastered JavaScript, TypeScript and many other languages and tools to get the best experience out
											of every application.
										</p>
									</div>
								</div>
							</div>
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

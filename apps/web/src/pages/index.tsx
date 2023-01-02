import { SecondaryButton } from "@creatorhub/buttons";
import { HomeNavbar } from "@creatorhub/navbar";

export default function Web() {
	return (
		<>
			<HomeNavbar />
			<div className="px-8 min-h-screen bg-home_header bg-no-repeat bg-[right_top]">
				<div className="px-24 py-[232px] flex flex-col gap-20">
					<div>
						<h1 className="text-title">SCR Creators,</h1>
						<h2 className="text-subtitle">You’re in the right place.</h2>
					</div>
					<div className="flex flex-col gap-5">
						<h2 className="text-subtitle max-w-xl">
							Hundreds of assets, accessible in <strong className="text-highlight font-semibold">seconds</strong>
						</h2>
						<SecondaryButton type="link" href="/login" extra="w-fit">
							Get Started
						</SecondaryButton>
					</div>
				</div>
			</div>
		</>
	);
}

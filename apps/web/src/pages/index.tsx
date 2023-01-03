import { SecondaryButton } from "@creatorhub/buttons";
import { HomeNavbar } from "@creatorhub/navbar";

export default function Web() {
	return (
		<>
			<HomeNavbar />
			<div className="px-8 min-h-screen bg-home_header bg-no-repeat bg-[right_top] max-lg:bg-home_header_lg max-md:bg-home_header_md">
				<div className="px-24 py-[232px] flex flex-col gap-20 max-md:px-2 max-md:py-[146px]">
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
			</div>
		</>
	);
}

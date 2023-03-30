import { SecondaryButton, TransparentButton } from "@creatorhub/buttons";
import { Modal } from "@creatorhub/modal";
import type React from "react";

interface Props {
	isOpen: boolean;
	onClick: () => void;
	toast: (str: string) => void;
}

export const AttributionModal: React.FC<Props> = (props) => {
	const copyText = (text: string) => {
		void navigator.clipboard.writeText(text);
		props.toast("Copied to clipboard!");
	};

	return (
		<Modal {...props}>
			<div className="max-w-[675px]">
				<h1 className="text-3xl leading-10 my-4">Thanks for downloading an asset!</h1>
				<p className="text-base">Remember to put the appropriate credits in the description or subtitle under the image.</p>
			</div>
			<div className="max-w-[675px]">
				<div className="mt-4">
					<h3 className="text-lg">Description</h3>
					<div className="bg-grey p-2 rounded-xl relative mt-1">
						<p className="text-base pr-12">
							Some content in this video was provided by SCR Creator Hub, a stock image/footage site for SCR Creators.
							https://scrcreate.app
						</p>
						<TransparentButton
							type="button"
							className="absolute top-0 right-0"
							onClick={() =>
								copyText(
									"Some content in this video was provided by SCR Creator Hub, a stock image/footage site for SCR Creators. https://scrcreate.app"
								)
							}
						>
							<i className="fa-solid fa-copy" />
						</TransparentButton>
					</div>
				</div>
			</div>
			<div className="max-w-[675px] flex items-center justify-center mt-4">
				<SecondaryButton type="button" onClick={props.onClick} className="!bg-[#6F7FFF] hover:!bg-[#6F7FFF50]">
					Understood
				</SecondaryButton>
			</div>
		</Modal>
	);
};

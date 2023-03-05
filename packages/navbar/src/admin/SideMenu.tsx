import { SecondaryButton, TransparentButton } from "@creatorhub/buttons";
import type React from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";

interface Props {
	closeMenu: () => void;
	active: boolean;
}

const TopVariants: Variants = {
	initial: {
		opacity: 0,
		transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
	},
	animate: {
		opacity: 1,
		transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
	}
};

const SideVariants: Variants = {
	initial: {
		transform: "translateX(-320px)",
		transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
	},
	animate: {
		transform: "translateX(0px)",
		transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
	},
	exit: {
		transform: "translateX(-320px)",
		transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
	}
};

export const SideMenu: React.FC<Props> = ({ active, closeMenu }) => {
	const animateController = useAnimation();

	useEffect(() => {
		if (active) void animateController.start("animate");
		else void animateController.start("exit");

		return () => animateController.stop();
	}, [active]);

	return (
		<motion.div
			variants={TopVariants}
			initial="initial"
			animate={animateController}
			className={`w-screen h-screen z-10 left-0 top-0 fixed ${active ? "pointer-events-auto" : "pointer-events-none"} backdrop-blur`}
		>
			<motion.div
				variants={SideVariants}
				initial="initial"
				animate={animateController}
				className="absolute w-80 h-screen bg-main pt-20 flex flex-col px-4 gap-4"
			>
				<div>
					<h1 className="text-xl font-bold">Products</h1>
					<div className="flex flex-col gap-2 pl-2">
						<TransparentButton type="link" href="/videos" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-film" /> Video
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/images" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-image" /> Images
							</p>
						</TransparentButton>
					</div>
				</div>
				<div>
					<h1 className="text-xl font-bold">Resources</h1>
					<div className="flex flex-col gap-2 pl-2">
						<TransparentButton type="link" href="/about" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-building" /> About Us
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/support" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-question" /> Support
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/tos" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-book" /> Terms of Service
							</p>
						</TransparentButton>
						<TransparentButton type="link" href="/privacy" onClick={closeMenu}>
							<p className="text-lg font-normal flex gap-2 items-center">
								<i className="fa-solid fa-fingerprint" /> Privacy Policy
							</p>
						</TransparentButton>
					</div>
				</div>
				<SecondaryButton type="link" href="/login" onClick={closeMenu}>
					<p className="w-full flex gap-4 justify-center items-center">
						Sign in <i className="fa-solid fa-arrow-right-long" />
					</p>
				</SecondaryButton>
			</motion.div>
		</motion.div>
	);
};

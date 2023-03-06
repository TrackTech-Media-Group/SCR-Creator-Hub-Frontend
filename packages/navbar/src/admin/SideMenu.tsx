import { PrimaryButton, TransparentButton } from "@creatorhub/buttons";
import type React from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";

interface Props {
	active: boolean;
	tags: { id: string; name: string }[];

	openCreateTag: () => void;
	deleteTag: (id: string) => void;
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

export const SideMenu: React.FC<Props> = ({ active, tags, deleteTag, openCreateTag }) => {
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
				className="absolute w-80 h-screen bg-secondary pt-20 flex flex-col px-4 gap-2"
			>
				{tags.map((t, k) => (
					<TransparentButton key={k} type="button" className="hover:!text-white" onClick={() => deleteTag(t.id)}>
						<p className="text-lg font-normal flex gap-2 items-center hover:line-through">{t.name}</p>
					</TransparentButton>
				))}
				<PrimaryButton type="button" onClick={openCreateTag} className="mt-4">
					<p className="w-full flex gap-4 justify-center items-center">
						Create tag <i className="fa-solid fa-plus" />
					</p>
				</PrimaryButton>
			</motion.div>
		</motion.div>
	);
};

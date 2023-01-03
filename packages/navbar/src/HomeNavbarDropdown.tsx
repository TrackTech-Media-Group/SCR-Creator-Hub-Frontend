import { motion, Variants } from "framer-motion";
import Link from "next/link";
import type React from "react";

const variants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.15,
			ease: [0.4, 0, 0.2, 1]
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.15,
			ease: [0.4, 0, 0.2, 1]
		}
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.15,
			ease: [0.4, 0, 0.2, 1]
		}
	}
};

interface Item {
	name: string;
	icon: string;
	href: string;
}

interface Props {
	items: Item[];
}

const HomeNavbarDropdown: React.FC<Props> = ({ items }) => {
	return (
		<motion.ul
			variants={variants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="absolute columns-2 bg-secondary p-4 rounded-lg right-0 translate-y-2"
		>
			<div className="bg-secondary absolute -top-1 right-5 w-6 h-6 rotate-45 z-[1]"></div>
			{items.map((item, key) => (
				<li key={key} className="z-10 relative">
					<Link href={item.href} className="hover:text-white-600 transition-colors">
						<p className="h-fit min-w-max text-base font-semibold flex gap-2 items-center">
							<i className={item.icon} />
							{item.name}
						</p>
					</Link>
				</li>
			))}
		</motion.ul>
	);
};

export default HomeNavbarDropdown;

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
	href?: string;
	onClick?: () => void;
}

interface Props {
	items: Item[];
}

const CardDropdown: React.FC<Props> = ({ items }) => {
	return (
		<motion.ul
			variants={variants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="absolute bg-secondary p-4 rounded-lg top-[4.1rem] right-2 z-20"
		>
			<div className="bg-secondary absolute -top-1 right-3 w-6 h-6 rotate-45 z-[1]"></div>
			{items.map((item, key) => (
				<li key={key} className="z-10 relative">
					{item.href ? (
						<Link href={item.href} onClick={item.onClick} className="hover:text-white-600 transition-colors">
							<p className="h-fit min-w-max text-base font-semibold flex gap-2 items-center">
								<i className={item.icon} />
								{item.name}
							</p>
						</Link>
					) : (
						<button onClick={item.onClick} className="hover:text-white-600 transition-colors">
							<p className="h-fit min-w-max text-base font-semibold flex gap-2 items-center">
								<i className={item.icon} />
								{item.name}
							</p>
						</button>
					)}
				</li>
			))}
		</motion.ul>
	);
};

export default CardDropdown;

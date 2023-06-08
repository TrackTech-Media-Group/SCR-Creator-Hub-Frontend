import { motion, type Variants } from "framer-motion";
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

export interface DropdownItem {
	name: string;
	icon: string;
	href: string;
}

interface Props {
	items: DropdownItem[];
	className?: string;
}

const DropdownComponent: React.FC<Props> = ({ items, className }) => {
	return (
		<motion.div variants={variants} initial="hidden" animate="visible" exit="exit" className="absolute right-0 translate-y-2">
			<div className="bg-secondary absolute -top-1 right-5 w-6 h-6 rotate-45 z-[1]"></div>
			<ul className={`${className ?? ""} bg-secondary p-4 rounded-lg`}>
				{items.map((item, key) => (
					<li key={key} className="z-10 relative">
						<Link href={item.href} className="hover:text-white-600 transition-colors">
							<p className="capitalize h-fit min-w-max text-base font-semibold flex gap-2 items-center">
								<i className={item.icon} />
								{item.name}
							</p>
						</Link>
					</li>
				))}
			</ul>
		</motion.div>
	);
};

export default DropdownComponent;

import type React from "react";

interface Props {
	onClick: () => void;
	active: boolean;
}

const MenuButton: React.FC<Props> = ({ onClick, active }) => {
	return (
		<button onClick={onClick} className="relative cursor-pointer w-6 h-8 z-20">
			<div className={`w-6 h-[2px] transition-all absolute right-0 bg-white -translate-y-1 ${active && "rotate-45 translate-y-[1px]"}`} />
			<div
				className={`w-4 h-[2px] transition-all absolute right-0 bg-white translate-y-1 ${active && "-rotate-45 translate-y-[0.5px] !w-6"}`}
			/>
		</button>
	);
};

export default MenuButton;

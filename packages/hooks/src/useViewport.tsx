import { useEffect, useState } from "react";

export const useViewport = (check: (window: Window) => boolean): boolean => {
	const [checkPassed, setCheckPassed] = useState(false);

	useEffect(() => {
		const scrollFn = () => {
			const checkValue = check(window);
			setCheckPassed(checkValue);
		};

		window.addEventListener("scroll", scrollFn);

		scrollFn();
		return () => window.removeEventListener("scroll", scrollFn);
	}, []);

	return checkPassed;
};

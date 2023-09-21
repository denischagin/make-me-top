import { useEffect, useState } from "react";

export const useGalaxyWindowSize = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	useEffect(() => {
		let timeout: NodeJS.Timeout | undefined;

		const updateSize = () => {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				const innerWidth = window.innerWidth > 1920 ? 1920 : window.innerWidth;
				setWindowSize(innerWidth);
			}, 100);
		};

		window.addEventListener("resize", updateSize);
		updateSize();

		return () => {
			window.removeEventListener("resize", updateSize);
			clearTimeout(timeout);
		};
	}, []);

	return windowSize;
};

import React, { useState } from "react";

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
	width: number | string;
	height: number | string;
};

export const Image: React.FC<Props> = (props) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<>
			<img
				alt={props.alt}
				{...props}
				onLoad={() => setIsLoaded(true)}
				style={{ ...props.style, display: isLoaded ? props.style?.display || "block" : "hidden" }}
			/>
			{!isLoaded && <div className="animate-skeleton" style={{ width: props.width, height: props.height }} />}
		</>
	);
};

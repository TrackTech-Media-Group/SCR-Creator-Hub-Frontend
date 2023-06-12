import React, { useEffect, useState } from "react";

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
	width: number | string;
	height: number | string;
	src: string;
};

const BrokenImageSvg: React.FC = () => (
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="48" height="48" x="0" y="0" viewBox="0 0 24 24" xmlSpace="preserve">
		<g>
			<g fill="#fff" fillRule="evenodd" clipRule="evenodd">
				<path
					d="M1.75 5c0-.967.783-1.75 1.75-1.75H15a.75.75 0 0 1 .643 1.136l-1.256 2.093.737 1.105a.75.75 0 0 1-.289 1.087l-3.516 1.758.423 2.965a.75.75 0 0 1-.536.827l-2.787.797 1.305 4.785A.75.75 0 0 1 9 20.75H3.5A1.75 1.75 0 0 1 1.75 19zm1.75-.25a.25.25 0 0 0-.25.25v14c0 .138.112.25.25.25h4.518l-1.242-4.553a.75.75 0 0 1 .518-.918l2.871-.82-.407-2.853a.75.75 0 0 1 .407-.777l3.24-1.62-.529-.793a.75.75 0 0 1-.02-.802l.82-1.364z"
					fill="#ffffff"
				></path>
				<path
					d="M18.376 3.584A.75.75 0 0 1 19 3.25h1.5c.967 0 1.75.784 1.75 1.75v14a1.75 1.75 0 0 1-1.75 1.75H12a.75.75 0 0 1-.721-.544l-1-3.5a.75.75 0 0 1 .515-.927l2.882-.824-.42-3.362a.75.75 0 0 1 .44-.778l3.725-1.656-1.064-1.773a.75.75 0 0 1 .019-.802zM19.4 4.75l-1.514 2.271 1.256 2.093a.75.75 0 0 1-.338 1.071l-3.992 1.774.431 3.448a.75.75 0 0 1-.538.814l-2.779.794.639 2.235H20.5a.25.25 0 0 0 .25-.25V5a.25.25 0 0 0-.25-.25zM5.75 8.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
					fill="#ffffff"
				></path>
			</g>
		</g>
	</svg>
);

export const ProgressiveImage: React.FC<Props> = (props) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const width = typeof props.width === "string" ? undefined : props.width;
		const height = typeof props.height === "string" ? undefined : props.height;
		const image = new Image(width, height);
		image.src = props.src;

		image.onload = () => setIsLoaded(true);
		image.onerror = () => setIsError(true);
	}, []);

	return isLoaded ? (
		<img alt={props.alt} {...props} onLoad={() => setIsLoaded(true)} />
	) : isError ? (
		<div className="bg-primary-100 grid place-items-center" style={{ width: props.width, height: props.height }}>
			<BrokenImageSvg />
		</div>
	) : (
		<div className="animate-skeleton" style={{ width: props.width, height: props.height }} />
	);
};

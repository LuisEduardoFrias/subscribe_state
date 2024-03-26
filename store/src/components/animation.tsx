/** @format */

import { ReactElement, useEffect, useState } from "react";
import Styles from "../styles/animation.module.css";

export const enum transitions {
	opacity = "opacity",
	transform = "transform"
}

export default function Animation({
	children,
	transition = transitions.opacity
}: {
	children: ReactElement;
	transition?: transitions;
}) {
	const [opacity, setOpacity] = useState(0);
	const [scale, setCale] = useState(0.7);
	//
	useEffect(() => {
		const timeoutID = setTimeout(() => {
			setOpacity(1);
			setCale(1);
		}, 1);

		return () => {
			clearTimeout(timeoutID);
		};
	}, []);
	//
	const _Style = {
		opacity: `${opacity}`,
		transform: `scale(${scale})`,
		transition: `${transition} 1s ease`
	};

	return (
		<div key={"animation"} className={Styles.animation} style={_Style}>
			{/**/}
			{children}
			{/**/}
		</div>
	);
}

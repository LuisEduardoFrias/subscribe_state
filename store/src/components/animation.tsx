/** @format */

import { ReactElement, useEffect, useState } from "react";
import Styles from "../styles/animation.module.css";

export default function Animation({ children }: { children: ReactElement }) {
	const [opacity, setOpacity] = useState("0");
	//
	useEffect(() => {
		const timeoutID = setTimeout(
			() => {
				setOpacity("1");
			},
			1,
			"wake up"
		);

		return () => {
			clearTimeout(timeoutID);
		};
	}, []);
	//
	const _Style = {
		opacity,
		transform: `scale(${opacity})`
	};

	return (
		<div key={"animation"} className={Styles.animation} style={_Style}>
			{/**/}
			{children}
			{/**/}
		</div>
	);
}

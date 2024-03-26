/** @format */

import { useState, ReactElement } from "react";
import Icon from "./icon";
import Animation, { transitions } from "./animation";
import "../styles/header.css";

export default function Header() {
	return (
		<header className='header-container'>
			<Open>
				<Icon>menu</Icon>
				<Icon>close</Icon>
			</Open>
			<h1>E-Commerce</h1>
			<Open>
				<Icon wght={900}>account_circle</Icon>
				<Icon wght={900}>account_circle</Icon>
			</Open>
		</header>
	);
}

function Open({ children }: { children: ReactElement }) {
	const [openStatus, setOpenStatus] = useState(true);

	const oneChildren: ReactElement = children[0];
	const twoChildren: ReactElement = children[1];

	const handleClick = () => setOpenStatus(!openStatus);

	const _Styles = { border: "none", backgroundColor: "transparent" };

	return (
		<button style={_Styles} onClick={handleClick}>
			{openStatus ? (
				<Animation key={"one-children"} transition={transitions.transform}>
					{oneChildren}
				</Animation>
			) : (
				<Animation key={"two-children"} transition={transitions.transform}>
					{twoChildren}
					No disponible
				</Animation>
			)}
		</button>
	);
}

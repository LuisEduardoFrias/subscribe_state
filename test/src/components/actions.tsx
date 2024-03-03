/** @format */

import React, { useRef } from "react";
import random_color from "../helpers/random_color";
import { useSuperState } from "../../../index.ts";
import { actions } from "../helpers/reducer";

import Styles from "../styles/actions.module.css";

const Actions = React.memo(function Actions() {
	const [state, dispatch] = useSuperState(["person"]);

	const _Styles = {
		backgroundColor: random_color()
	};

	return (
		<div className={Styles.typing}>
			<h2>Actions</h2>

			<div className='update' style={_Styles}></div>
			<div className={Styles.showAchievements}>
				{state.person.isAwake && (
					<div className={Styles.awake}>
						<span>{"AWAKE"}</span>
					</div>
				)}
				{state.person.isEating && (
					<div className={Styles.earting}>
						<span>{"EARTING"}</span>
					</div>
				)}
				{state.person.isTalking && (
					<div className={Styles.talking}>
						<span>{"Talking"}</span>
					</div>
				)}
				{state.person.isSleeping && (
					<div className={Styles.sleeping}>
						<span>{"Sleeping"}</span>
					</div>
				)}
			</div>
		</div>
	);
});

export default Actions;

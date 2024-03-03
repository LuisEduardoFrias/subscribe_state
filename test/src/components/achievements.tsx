/** @format */

import React, { useRef } from "react";
import random_color from "../helpers/random_color";
import { useSuperState } from "../../../index.ts";
import { actions } from "../helpers/reducer";

import Styles from "../styles/achievements.module.css";

const Achievements = React.memo(function Achievements() {
	const [state, dispatch] = useSuperState(["hasLicense", "age"]);

	const inputRef = useRef(null);

	function handleClickChangeName() {
		if (inputRef.current.value !== "")
			dispatch({ type: actions.change_name, value: inputRef.current.value });
	}

	function handleClickGetlicense() {
		dispatch({ type: actions.get_licence, value: true });
	}

	function handleClickGetPension() {
		dispatch({ type: actions.get_pension, value: true });
	}

	const _Styles = {
		backgroundColor: random_color()
	};

	return (
		<div className={Styles.typing}>
			<h2>Achievements</h2>

			<div className='update' style={_Styles}></div>
			<div className={Styles.showAchievements}>
				<div className={Styles.achievement}>
					<span>{"Birth certificate"}</span>
				</div>

				{state.age >= 18 && (
					<div className={Styles.achievement}>
						<span>{"Certificate of majority"}</span>
					</div>
				)}

				{state.age >= 18 && (
					<div className={Styles.achievement}>
						<span>{"Manage driver's license"}</span>

						<button className="btn" onClick={handleClickGetlicense}>
							Get a driver's license
						</button>
					</div>
				)}

				{state.age >= 20 && (
					<div className={Styles.achievement}>
						<span>{"Actorization to change your name"}</span>

						<input name='signature' ref={inputRef} className={Styles.input} />
						<button className="btn" onClick={handleClickChangeName}>
							update name
						</button>
					</div>
				)}
				
				{state.age >= 35 && (
					<div className={Styles.achievement}>
						<span>{"You have your car"}</span>
					</div>
				)}
				
				{state.age >= 50 && (
					<div className={Styles.achievement}>
						<span>{"You have your house"}</span>
					</div>
				)}

				{state.age >= 65 && (
					<div className={Styles.achievement}>
						<span>{"Manage pension"}</span>
						<button className="btn" onClick={handleClickGetPension}>
							get pension
						</button>
					</div>
				)}
			</div>
		</div>
	);
});

export default Achievements;

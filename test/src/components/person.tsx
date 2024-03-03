/** @format */

import { useEffect } from "react";
import random_color from "../helpers/random_color";
import { useSuperState } from "../../../index.ts";
import { actions } from "../helpers/reducer";
import Styles from "../styles/data_person.module.css";

export default function Person() {
	const [state, dispatch] = useSuperState(["person"]);

	useEffect(() => {
		state.person.dispatch = dispatch;
	}, []);

	function handleWakeUp() {
		state.person.wakeUp();
	}

	function handleSleep() {
		state.person.sleep();
	}

	function handleTalk() {
		state.person.talk();
	}

	function handleEart() {
		state.person.eat();
	}

	const _Styles = {
		backgroundColor: random_color()
	};

	return (
		<div className={Styles.typing}>
			<h2>Person</h2>
			<div className='update' style={_Styles}></div>
			<div className={Styles.showText}>
				<div>
					<button
						className='btn'
						disabled={state.person.isAwake}
						onClick={handleWakeUp}>
						wake up
					</button>
					<button
						className='btn'
						disabled={state.person.isSleeping}
						onClick={handleSleep}>
						Sleep
					</button>
					<button className='btn' onClick={handleTalk}>
						Talk
					</button>
					<button className='btn' onClick={handleEart}>
						Eart
					</button>
				</div>
			</div>
		</div>
	);
}

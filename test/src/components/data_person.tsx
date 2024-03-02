/** @format */

import { useRef } from "react";
import random_color from "../helpers/random_color";
import { useSuperState } from "../../../index.ts";
import { actions } from "../helpers/reducer";
import Styles from "../styles/data_person.module.css";

export default function DataPerson() {
	const [state, dispatch] = useSuperState(["name", "signature", "age"]);

	const inputRef = useRef(null);

	function handleChange() {
		dispatch({ type: actions.change_signature, value: inputRef.current.value });
	}

	function handleClick() {
		dispatch({ type: actions.update_age, value: state.age + 1 });
	}

	const _Styles = {
		backgroundColor: random_color()
	};

	return (
		<div className={Styles.typing}>
			<h2>Data Person</h2>
			<div className='update' style={_Styles}></div>
			<div className={Styles.showText}>
				<div>
					<label for='name'>{"Name: "}</label>
					<span id='name' className={Styles.name}>
						{state.name}
					</span>
				</div>
				<div>
					<label for='signature'>{"Signature: "}</label>
					<span id='signature' className={Styles.signature}>
						{state.signature}
					</span>
				</div>
				<div>
					<label for='age'>{"Age: "}</label>
					<span id='age' className={Styles.age}>
						{state.age}
					</span>
				</div>
			</div>

			<div className={Styles.panelWrite}>
				<input
					name='signature'
					ref={inputRef}
					className={Styles.input}
					onChange={handleChange}
				/>
				<button className={Styles.btn} onClick={handleClick}>
					update age
				</button>
			</div>
		</div>
	);
}

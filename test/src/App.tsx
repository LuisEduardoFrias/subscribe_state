/** @format */

import { useRef, useMemo } from "react";
import DataPerson from "../src/components/data_person";
import initialState from "./helpers/initial_state";
import random_color from "./helpers/random_color";
import useSuperState from "../../index.ts";
import Reducer, { actions } from "./helpers/reducer";
import Styles from "./styles/app.module.css";
//
export default function App() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"isTyping",
		"text"
	]);

	const inputRef = useRef(null);
	const timeoutRef = useRef(null);

	function handleChange(event: any) {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		dispatch({ type: actions.typing, value: true });

		timeoutRef.current = setTimeout(() => {
			dispatch({ type: actions.typing, value: false });
		}, 1000);
	}

	function handleClick() {
		dispatch({ type: actions.send_writed, value: inputRef.current.value });
	}

	const MemoDataPerson = useMemo(() => {
		return <DataPerson />;
	}, []);

	const _Styles = {
		backgroundColor: random_color()
	};

	return (
		<div className={Styles.container}>
			<h1 className={Styles.h1}>Test UseSuperState</h1>

			<div className={Styles.typing}>
				<h2>App</h2>
				<div className='update' style={_Styles}></div>
				<div className={Styles.showText}>
					{
						<span className={Styles.isTyping}>
							{state.isTyping ? "is typing..." : "..."}
						</span>
					}
					<span className={Styles.text}>{state.text}</span>
				</div>

				<div className={Styles.panelWrite}>
					<input
						name='text'
						ref={inputRef}
						className={Styles.input}
						onChange={handleChange}
					/>
					<button className={Styles.btn} onClick={handleClick}>
						send
					</button>
				</div>
				{MemoDataPerson }
			</div>
		</div>
	);
}

/** @format */

import { useReducer } from "react";
import { Action, GlobalState } from "./types";
import { GLOBAL_STATE, OUT_REDUCER } from "./constants";
import {
	subCribe,
	middleDistpach,
	returnStateForSubscribe,
	clone
} from "./functionalities";

export default function useSuperState(
	props: string[],
	postDispatch?: (
		action: Action,
		state: object,
		dispatch: (action: Action) => void
	) => void
) {
	//Solo hace que el useReducer renderize el componente
	function reducer(state: object, action: Action) {
		const otherState: GlobalState = clone(GLOBAL_STATE);

		otherState.__obtionId__ = getRandomValue(GLOBAL_STATE.__obtionId__);

		return otherState;
	}

	function getRandomValue(x: number) {
		let num;
		do {
			num = Math.floor(Math.random() * 1001);
		} while (num === x);
		return num;
	}

	const [state, dispatch] = useReducer(reducer, GLOBAL_STATE);

	//Get component name/ don't touch it!
	const callerFunction: string =
		new Error().stack?.split("\n")[2].trim().split(" ")[1] ??
		"crypto.randomUUID";

	//subscribe the component
	subCribe(props, callerFunction, (action: Action) => dispatch(action));

	//Check if a dispatch is added to execute before the execution continues.
	function outDispatch(action: Action) {
		if (postDispatch) {
			postDispatch(action, GLOBAL_STATE, (_action: Action) => {
				middleDistpach(_action, OUT_REDUCER.fn);
			});
		} else {
			middleDistpach(action, OUT_REDUCER.fn);
		}
	}

	const returnedState: object = returnStateForSubscribe(
		GLOBAL_STATE,
		callerFunction
	);

	return [returnedState, outDispatch];
}

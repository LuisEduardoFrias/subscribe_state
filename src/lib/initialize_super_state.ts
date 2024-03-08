/** @format */

import { setObj, getKeys } from "./functionalities";
import { Reducer, AnyObject } from "./types";
import { GLOBAL_STATE, OUT_REDUCER } from "./constants";

export default function initializeSuperState(
	reducer: Reducer,
	initalState: AnyObject
): void {
	setObj(OUT_REDUCER, "fn", reducer);

	//Initialize the global state
	if (getKeys(GLOBAL_STATE).length === 1) {
		getKeys(initalState).forEach((e: string) =>
			setObj(GLOBAL_STATE, e, initalState[e])
		);
	}
}

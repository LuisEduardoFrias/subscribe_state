/** @format */

import { setObj, getKeys } from "./functionalities.ts";

import {
	Reducer,
	GLOBAL_STATE,
	OutReducer
} from "./types_constans";

export default function initializeSuperState(
	reducer: Reducer,
	initalState: object
): void {
	setObj(OutReducer, "fn", reducer);

	//Initialize the global state
	if (getKeys(GLOBAL_STATE).length === 0) {
		getKeys(initalState).forEach((e: string) =>
			setObj(GLOBAL_STATE, e, initalState[e])
		);
	}
}

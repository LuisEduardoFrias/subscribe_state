/** @format */

import React, { useReducer } from "react";

import {
	SubCribe,
	MiddleDistpach,
	ReturnStateForSubscribe
} from "./functionalities";

import {
	Action,
	Reducer,
	UPDATE_OBTION_ID,
	GLOBAL_STATE,
	OutReducer
} from "./types_constans";

export function useSuperState(
	props: string[],
	postDispatch?: (
		action: Action,
		state: object,
		dispatch: (action: Action) => void
	) => void
) {
	//
	function middlereducer(state: object, action: Action): object {
		//se ejecuta cuando se requiere actializar el estado de determinado suscriptor
		if (action.type === UPDATE_OBTION_ID) {
			return {
				...GLOBAL_STATE,
				__obtionId__: GLOBAL_STATE.__obtionId__
					? GLOBAL_STATE.__obtionId__ === 10
						? 0
						: GLOBAL_STATE.__obtionId__ + 1
					: 0
			};
		}

		//TODO validar si eventual mente este reducer se ejecuta.
		return OutReducer(state, action);
	}

	const [state, dispatch] = useReducer(middlereducer, GLOBAL_STATE);

	//Get component name
	const callerFunction = new Error().stack?.split("\n")[2].trim().split(" ")[1];

	//subscribe the component
	SubCribe(props, callerFunction, dispatch);

	//Check if a dispatch is added to execute before the execution continues.
	function outDispatch(action: Action) {
		if (postDispatch) {
			postDispatch(action, GLOBAL_STATE, (_action: Action) => {
				MiddleDistpach(_action, OutReducer);
			});
		} else {
			MiddleDistpach(action, OutReducer);
		}
	}

	const returnedState: object = ReturnStateForSubscribe(
		GLOBAL_STATE,
		callerFunction
	);

	return [returnedState, outDispatch];
}

export default function usuInitializeSuperState(
	reducer: Reducer,
	initalState: object
) {
	OutReducer = reducer;

	function middlereducer(state: object, action: Action): object {
		//se ejecuta cuando se requiere actializar el estado de determinado suscriptor
		if (action.type === UPDATE_OBTION_ID) {
			return {
				...GLOBAL_STATE,
				__obtionId__: GLOBAL_STATE.__obtionId__
					? GLOBAL_STATE.__obtionId__ === 10
						? 0
						: GLOBAL_STATE.__obtionId__ + 1
					: 0
			};
		}

		//TODO validar si eventual mente este reducer se ejecuta.
		return reducer(state, action);
	}

	const [state, dispatch] = useReducer(middlereducer, initalState);

	//Initialize the global state
	if (Reflect.ownKeys(GLOBAL_STATE).length === 0) {
		Reflect.ownKeys(initalState).forEach((e: string) =>
			Reflect.set(GLOBAL_STATE, e, initalState[e])
		);
	}
}

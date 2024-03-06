/** @format */

import { useReducer } from "react";
import { Action } from "./types";
import { UPDATE_OBTION_ID, GLOBAL_STATE, OUT_REDUCER } from "./constants";
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
	//
	function middlereducer(state: object, action: Action) {
		//se ejecuta cuando se requiere actializar el estado de determinado suscriptor
		if (action.type === UPDATE_OBTION_ID) {
			return clone({
				GLOBAL_STATE,
				__obtionId__: GLOBAL_STATE.__obtionId__
					? GLOBAL_STATE.__obtionId__ === 10
						? 0
						: GLOBAL_STATE.__obtionId__ + 1
					: 0
			});
		}

		//TODO validar si eventual mente este reducer se ejecuta.
		//alert("TODO validar si eventual mente este reducer se ejecuta.");
		//return OUT_REDUCER.fn(state, action);
		return {}
	}

	const [state, dispatch] = useReducer(middlereducer, GLOBAL_STATE);

	//Get component name
	const callerFunction =
		new Error().stack?.split("\n")[2].trim().split(" ")[1] ??
		"crypto.randomUUID";

	//subscribe the component
	subCribe(props, callerFunction, dispatch);

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

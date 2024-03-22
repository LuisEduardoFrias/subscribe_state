/** @format */

import { Action, GlobalState } from "../../../src/types/index";

export enum actions {}

export default function Reducer(
	state: GlobalState,
	action: Action
): GlobalState {
	//
	const _action = {
		typing: () => {
			state.isTyping = action.value;
			return state;
		},
		default: () => {
			console.log(`El type: ${action.type} no existe`);
			return undefined;
		}
	};

	return (_action[action.type] ?? _action["default"])();
}

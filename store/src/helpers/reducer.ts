/** @format */

import { Action, GlobalState } from "../../../src/types/index";

export enum actions {
	detailts = "detailts",
	add_store = "add_store",
	remove = "remove",
	show_basket_details = "show_basket_details"
}

export default function Reducer(
	state: GlobalState,
	action: Action
): GlobalState {
	//
	const _action = {
		detailts: () => {
			const newState: any = { ...state };
			newState.showProduct = action.value;
			return newState;
		},
		add_store: () => {
			const store: any = [...state.store];
			store.push(action.value);
			return { ...state, store };
		},
		remove: () => {
			const newState: any = { ...state };
			const store: any = newState.store;

			newState.store = [
				...store.filter((e: Product, i: number) => e.id !== action.value)
			];

			return newState;
		},
		show_basket_details: () => {
			const newState: any = { ...state };
			newState.showBasketDetails = action.value;
			return newState;
		},
		default: () => {
			console.log(`El type: ${action.type} no existe`);
			return undefined;
		}
	};

	return (_action[action.type] ?? _action["default"])();
}

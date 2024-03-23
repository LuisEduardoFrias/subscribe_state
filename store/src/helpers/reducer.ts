/** @format */

import { ProductSummary } from "../types/product_summary";

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
			newState.showBasketDetails = false;
			return newState;
		},
		add_store: () => {
			const store: any = [...state.store];

			const index = store.findIndex(
				(obj: ProductSummary) => obj.product.id === action.product.id
			);

			if (index !== -1) {
				const amount = store[index].amount;
				const newAmount: number = amount + action.amount;
				if (newAmount >= 1) {
					store[index] = {
						product: action.product,
						amount: newAmount
					};
				} else if (newAmount <= 0) {
					
					return { ...state, store: [...store.splice(index, 1)] };
				}
			} else {
				store.push({ product: action.product, amount: action.amount });
			}

			return { ...state, store };
		},
		remove: () => {
			const store: any = [...state.store];
			const newState: any = { ...state };

			newState.store = [
				...store.filter(
					(obj: ProductSummary, i: number) => obj.product.id !== action.id
				)
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

/** @format */

import { ProductSummary } from "../types/product_summary";

import { Store } from "../types/store.d";
import { Action } from "../../../src/types/index";

export enum actions {
    add_product = "add_product",
    detailts = "detailts",
    add_store = "add_store",
    remove = "remove",
    show_basket_details = "show_basket_details",
    markUnmarkPayment = "markUnmarkPayment",
    buy = "buy"
}

export default function Reducer(state: Store, action: Action): Store {
    //
    const _action = {
        add_product: () => {
            console.log(
                "productos all: " + JSON.stringify(action.products, null, 2)
            );
            return { ...state, products: action.products };
        },
        detailts: () => {
            const newState: any = { ...state };
            newState.showProduct = action.value;
            newState.showBasketDetails = false;
            return newState;
        },
        markUnmarkPayment: () => {
            const store: any = [...state.store];
            return {
                ...state,
                store: [
                    ...store.map((obj: ProductSummary) => {
                        if (obj.product.id === action.id) {
                            const newObj = { ...obj };
                            newObj.pay = action.isChecked;
                            return newObj;
                        }

                        return obj;
                    })
                ]
            };
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
                        pay: true,
                        amount: newAmount
                    };
                } else if (newAmount <= 0) {
                    return { ...state, store: [...store.splice(index, 1)] };
                }
            } else {
                store.push({
                    product: action.product,
                    amount: action.amount,
                    pay: true
                });
            }

            return { ...state, store };
        },
        buy: () => {
            const store: any = [...state.store];

            return { ...state };
        },
        remove: () => {
            const store: any = [...state.store];

            return {
                ...state,
                store: [
                    ...store.filter(
                        (obj: ProductSummary) => obj.product.id !== action.id
                    )
                ]
            };
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

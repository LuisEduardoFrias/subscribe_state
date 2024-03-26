/** @format */

import { Store } from "../types/store.d";

export default function initialState(): Store {
    return {
        products: [],
        store: [],
        purchased: [],
        showProduct: undefined,
        showBasketDetails: false
    };
}

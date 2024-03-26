/** @format */

import {  GlobalState } from "../../../src/types/index";

 type BaseStore = {
	products: Product[];
	store: ProductSummary[];
	purchased: ProductSummary[];
	showProduct: Product | undefined;
	showBasketDetails: boolean;
};

export type Store = BaseStore & GlobalState;

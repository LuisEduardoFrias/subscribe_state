/** @format */

import { memo } from "react";
import useSuperState from "../super_state/lib/super_state.ts";
import BasketDetailsProduct from "./basket_details_product.tsx";
import Icon from "./icon";
import { actions } from "../helpers/reducer";
import { productSummary } from "../types/product_summary";
import { Product } from "../types/product";
import "../styles/basket_details.css";

const BasketDetails = memo(function BasketDetails() {
	const [{ store }, dispatch] = useSuperState(["store"]);

	function handleBack() {
		dispatch({ type: actions.show_basket_details, value: false });
	}

	return (
		<div className='container-backet-details'>
			<button className='btn' onClick={handleBack}>
				<Icon>arrow_back</Icon>
			</button>

			{store.length === 0 && <span>No hey producto</span>}

			{store.map((sp: productSummary) => (
				<BasketDetailsProduct
					key={sp.product.id}
					product={sp.product}
					amount={sp.amount}
				/>
			))}
		</div>
	);
});

export default BasketDetails;

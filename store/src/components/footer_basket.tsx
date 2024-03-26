/** @format */

import { memo } from "react";
import { actions } from "../helpers/reducer";
import useSuperState from "../super_state/lib/super_state.ts";
import "../styles/footer_basket.css";

const FooderBasket = memo(function FooderBasket() {
	const [{ store }, dispatch] = useSuperState(["store"]);

	const amount: number = store.reduce((ac, cu) => {
		if (cu.pay) return ac + cu.product.price * cu.amount;

		return ac;
	}, 0);

	function handleBuy() {
		dispatch({ type: actions.buy });
	}

	return (
		<div className='footer-basket-container'>
			<span>total: ${amount.toFixed(2)}</span>
			<button className='btn' onClick={handleBuy}>
				Buy
			</button>
		</div>
	);
});

export default FooderBasket;

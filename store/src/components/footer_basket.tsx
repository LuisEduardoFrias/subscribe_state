/** @format */

import { memo } from "react";
import useSuperState from "../super_state/lib/super_state.ts";
import "../styles/footer_basket.css";

const FooderBasket = memo(function FooderBasket() {
	const [{ store }, dispatch] = useSuperState(["store"]);

	const amount: number = store.reduce(
		(ac, cu) => ac + cu.product.price * cu.amount,
		0
	);

	return (
		<div className='footer-basket-container'>
			<span>total: ${amount.toFixed(2)}</span>
			<button className='btn'>Buy</button>
		</div>
	);
});

export default FooderBasket;

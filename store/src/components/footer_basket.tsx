/** @format */

import useSuperState from "../super_state/lib/super_state.ts";
import "../styles/footer_basket.css";

export default function FooderBasket() {
	const [state, dispatch] = useSuperState(["store"]);

	const amount: number = state.store.reduce((ac, cu) => ac + cu.price, 0);

	return (
		<div className='footer-basket-container'>
			<span>total: ${amount}</span>
			<button className='btn'>Buy</button>
		</div>
	);
}

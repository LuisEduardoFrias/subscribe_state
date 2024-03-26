/** @format */

import useSuperState from "../super_state/lib/super_state.ts";
import { actions } from "../helpers/reducer";
import { Product } from "../types/product";
import "../styles/option_product.css";

export default function OptionProduct({
	product,
	index,
	amount
}: {
	product: Product;
	index: number;
	amount: number;
}) {
	const [_, dispatch] = useSuperState([]);

	function handleRemove() {
		dispatch({ type: actions.remove, id: product.id });
	}

	function handleAddDetail(evet: HTMLAElement) {
		dispatch({ type: actions.detailts, value: product });
	}

	return (
		<li className='option-product-container'>
			<a onClick={handleAddDetail}>
				<span>{product.title}</span>
				<span>{`${amount} x $${product.price}`}</span>
			</a>
			<button className='btn-remove' onClick={handleRemove}>
				🗑️
			</button>
		</li>
	);
}

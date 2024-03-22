/** @format */

import useSuperState from "../super_state/lib/super_state.ts";
import { actions } from "../helpers/reducer";
import { Product } from "../types/product";
import "../styles/option_product.css";

export default function OptionProduct({
	product,
	index,
	count
}: {
	product: Product;
	index: number;
	count: number;
}) {
	const [_, dispatch] = useSuperState([]);

	function handleRemove() {
		dispatch({ type: actions.remove, value: product.id, index });
	}

	function handleAddDetail(evet: HTMLAElement) {
		dispatch({ type: actions.detailts, value: product });
	}

	return (
		<li className='option-product-container'>
			<a onClick={handleAddDetail}>
				<span>{product.title}</span>
				<span>{`${count} x $${product.price}`}</span>
			</a>
			<button onClick={handleRemove}>🗑️</button>
		</li>
	);
}

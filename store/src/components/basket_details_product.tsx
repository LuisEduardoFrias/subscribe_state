/** @format */

import useSuperState from "../super_state/lib/super_state.ts";

import { actions } from "../helpers/reducer";
import { Product } from "../types/product.ts";
import AmountControl from "./amount_control";
import "../styles/basket_details_product.css";

export default function BasketDetailsProduct({
	product,
	amount
}: {
	product: Product;
	amount: number;
}) {
	const [_, dispatch] = useSuperState([]);

	function handleRemove(id: number) {
		dispatch({ type: actions.remove, id });
	}
	
	function handleUpdateStore(value: number) {
		dispatch({ type: actions.add_store, product, amount });
	}

	return (
		<div className='container-backet-details-product'>
			<img
				loading='lazy'
				src={product.image}
				width='100'
				height='100'
				alt={product.title}
			/>
			<div>
				<span>{product.title}</span>
				<div>
					<AmountControl amount={amount} setAmount={handleUpdateStore} />
					<button
						className='btn'
						onClick={() => {
							handleRemove(product.id);
						}}>
						🗑️
					</button>
				</div>
			</div>
		</div>
	);
}

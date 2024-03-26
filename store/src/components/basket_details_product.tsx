/** @format */

import { dispatch } from "../super_state/lib/super_state.ts";
import { actions } from "../helpers/reducer";
import { Product } from "../types/product";
import Check from "./check";
import AmountControl from "./amount_control";
import "../styles/basket_details_product.css";

export default function BasketDetailsProduct({
	product,
	pay,
	amount
}: {
	product: Product;
	pay: boolean;
	amount: number;
}) {
	function handleRemove() {
		dispatch({ type: actions.remove, id: product.id });
	}

	function handleUpdateStore(newAmount: number) {
		dispatch({ type: actions.add_store, product, amount: newAmount - amount });
	}

	function handleChecked(isChecked: boolean) {
		dispatch({ type: actions.markUnmarkPayment, isChecked, id: product.id });
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
				<div>
					<span>{product.title}</span>
					<div>
						<Check isChecked={pay} setChecked={handleChecked} />
					</div>
				</div>
				<div>
					<AmountControl amount={amount} setAmount={handleUpdateStore} />
					<button
						className='btn btn-remove'
						onClick={() => {
							handleRemove();
						}}>
						🗑️
					</button>
				</div>
			</div>
		</div>
	);
}

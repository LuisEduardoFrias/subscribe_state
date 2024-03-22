/** @format */

import useSuperState from "../super_state/lib/super_state.ts";
import { actions } from "../helpers/reducer";
import generateProductSummaryAdapter, {
	productSummary
} from "../adacters/generate_product_summary_adapter";
import { Product } from "../types/product";
import "../styles/basket_details.css";

export default function BasketDetails() {
	const [state, dispatch] = useSuperState(["store"]);

	const products: productSummary[] = generateProductSummaryAdapter(state.store);

	function handleBack() {
		dispatch({ type: actions.show_basket_details, value: false });
	}

	return (
		<div>
			<button className='btn' onClick={handleBack}>
				<span>➥</span>
			</button>

			{products.length === 0 && <span>No hey producto</span>}
			{products.map((sp: productSummary) => (
				<div>
					<span>{sp.product.title}</span>
					<img
						loading='lazy'
						src={sp.product.image}
						width='100'
						height='100'
						alt={sp.product.title}
					/>
					<button>-</button>
					<span>{sp.count}</span>
					<button>+</button>
					
						<button>🗑️</button>
				</div>
			))}

			<h1>cosas</h1>
		</div>
	);
}

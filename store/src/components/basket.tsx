/** @format */

import useSuperState from "../super_state/lib/super_state.ts";
import generateProductSummaryAdapter, {
	productSummary
} from "../adacters/generate_product_summary_adapter";
import { Product } from "../types/product";
import OptionProduct from "./option_product";
import "../styles/basket.css";

export default function Basket() {
	const [state, dispatch] = useSuperState(["store"]);

	let products: productSummary[] = generateProductSummaryAdapter(state.store);

	return (
		<div className='basket-container'>
			<ul>
				{products.map((obj: productSummary, index: number) => (
					<OptionProduct
						key={obj.product.id}
						product={obj.product}
						count={obj.count}
						index={index}
					/>
				))}
			</ul>
		</div>
	);
}

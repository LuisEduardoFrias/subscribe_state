/** @format */

import useSuperState from "../super_state/lib/super_state.ts";
/*import generateProductSummaryAdapter, {
	productSummary
} from "../adacters/generate_product_summary_adapter";*/

import { Product, ProductSummary } from "../types/product";
import OptionProduct from "./option_product";
import "../styles/basket.css";

export default function Basket() {
	const [{ store }, dispatch] = useSuperState(["store"]);

	//let products: productSummary[] = generateProductSummaryAdapter(store);

	return (
		<div className='basket-container'>
			<ul>
				{store.map((obj: ProductSummary, index: number) => (
					<OptionProduct
						key={obj.product.id}
						product={obj.product}
						amount={obj.amount}
						index={index}
					/>
				))}
			</ul>
		</div>
	);
}

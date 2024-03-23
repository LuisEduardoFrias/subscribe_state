/** @format */

import { memo } from "react";
import useSuperState from "../super_state/lib/super_state.ts";
import { ProductSummary } from "../types/product_summary";
import { Product } from "../types/product";
import OptionProduct from "./option_product";
import "../styles/basket.css";

const Basket = memo(function Basket() {
	const [{ store }, dispatch] = useSuperState(["store"]);

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
});

export default Basket;

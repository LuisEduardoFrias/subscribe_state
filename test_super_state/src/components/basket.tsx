/** @format */

import { Product } from "../types/product";
import OptionProduct from "./option_product";
import products from "../helpers/limit_products_success_results.json";
import "../styles/basket.css";

export default function Basket() {
	return (
		<div className='basket-container'>
			<ul>
				{products.map((product: Product, index: number) => (
					<OptionProduct key={product.id} product={product} />
				))}
			</ul>
		</div>
	);
}

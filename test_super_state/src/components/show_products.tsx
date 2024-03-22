/** @format */

import { Product as Pd } from "../types/product";
import Product from "./product";
import "../styles/show_product.css";
import products from "../helpers/limit_products_success_results.json";

export default function ShowProducts() {
	return (
		<article className='show-products-container'>
			<ul>
				{products.map((product: Pd, index: number) => (
					<Product key={product.id} product={product} />
				))}
			</ul>
		</article>
	);
}

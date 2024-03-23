/** @format */

import { memo } from "react";
import { Product as Pd } from "../types/product";
import Product from "./product";
import "../styles/show_product.css";
import products from "../helpers/limit_products_success_results.json";

const ShowProducts = memo(function ShowProducts() {
	return (
		<article className='show-products-container'>
			<ul>
				{products.map((product: Pd, index: number) => (
					<Product key={product.id} product={product} />
				))}
			</ul>
		</article>
	);
});

export default ShowProducts;

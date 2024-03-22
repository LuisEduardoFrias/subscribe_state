/** @format */

import { Product } from "../types/product";
import "../styles/option_product.css";

export default function OptionProduct({ product }: { product: Product }) {
	return (
			<li className='option-product-container'>
		<a>
				<span>{product.title}</span>
				<span>{`$${product.price}`}</span>
				<button>🗑️</button>
			</a>
		</li>
	);
}

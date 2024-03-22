/** @format */

import { Product } from "../types/product";
import Rating from "./rating";
import "../styles/product.css";

export default function Product({ product }: { product: Product }) {
	return (
		<li>
		<a className='product-container'>
			<span>{product.title}</span>
			<img loading='lazy' src={product.image} alt={product.title} />
			<Rating rating={product.rating} />
		</a>
		</li>
	);
}

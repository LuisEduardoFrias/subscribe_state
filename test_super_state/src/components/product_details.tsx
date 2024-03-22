/** @format */

//import { Product } from "../types/product";
import "../styles/product_details.css";
import Rating from "./rating";
import products from "../helpers/limit_products_success_results.json";

export default function ProductDetails() {
	const product: object = products[2];

	return (
		<acticle className='product-details-container'>
			<div className='title'>
				<h1>{product.title}</h1>
			</div>

			<div className='div-x'>
				<img loading='lazy' src={product.image} alt={product.title} />
			</div>

			<div>
				<span>{product.category}</span>
				<span>Price: {product.price}</span>
				<div>
					<p>{product.description}</p>
				</div>
				<div>
					<Rating rating={product.rating} />
				</div>
			</div>
		</acticle>
	);
}

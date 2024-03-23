/** @format */

import { memo } from "react";
import { useState } from "react";
//import { Product } from "../types/product";
import AmountControl from "./amount_control";
import Icon from "./icon";
import { actions } from "../helpers/reducer";
import useSuperState from "../super_state/lib/super_state.ts";
import "../styles/product_details.css";
import Rating from "./rating";
import products from "../helpers/limit_products_success_results.json";

const ProductDetails = memo(function ProductDetails() {
	const [{ showProduct }, dispatch] = useSuperState(["showProduct"]);

	const [amount, setAmount] = useState(1);

	function handleBack() {
		dispatch({ type: actions.detailts });
	}

	function handleAddStore() {
		dispatch({ type: actions.add_store, product: showProduct, amount });
	}

	return (
		<article className='product-details-container'>
			<div className='title'>
				<h1>{showProduct.title}</h1>
			</div>

			<div className='div-x'>
				<img loading='lazy' src={showProduct.image} alt={showProduct.title} />
			</div>

			<div>
				<span>{showProduct.category}</span>
				<span>Price: {showProduct.price}</span>
				<div>
					<p>{showProduct.description}</p>
				</div>

				<button className='btn back-btn' onClick={handleBack}>
					<Icon fill={1} wght={800} grad={100}>
						arrow_back
					</Icon>
				</button>

				<div>
					<div>
						<Rating rating={showProduct.rating} />
					</div>

					<div>
						<AmountControl amount={amount} setAmount={setAmount} />

						<button className='btn' onClick={handleAddStore}>
							<Icon wght={800} grad={800}>
								add_circle
							</Icon>
						</button>
					</div>
				</div>
			</div>
		</article>
	);
});

export default ProductDetails;

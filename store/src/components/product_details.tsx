/** @format */

//import { Product } from "../types/product";
import { actions } from "../helpers/reducer";
import useSuperState from "../super_state/lib/super_state.ts";
import "../styles/product_details.css";
import Rating from "./rating";
import products from "../helpers/limit_products_success_results.json";

export default function ProductDetails() {
	const [state, dispatch] = useSuperState(["showProduct"]);

	function handleBack() {
		dispatch({ type: actions.detailts });
	}

	function handleAddStore() {
		dispatch({ type: actions.add_store, value: state.showProduct });
	}

	return (
		<acticle className='product-details-container'>
			<div className='title'>
				<h1>{state.showProduct.title}</h1>
			</div>

			<div className='div-x'>
				<img
					loading='lazy'
					src={state.showProduct.image}
					alt={state.showProduct.title}
				/>
			</div>

			<div>
				<span>{state.showProduct.category}</span>
				<span>Price: {state.showProduct.price}</span>
				<div>
					<p>{state.showProduct.description}</p>
				</div>
				<div>
					<Rating rating={state.showProduct.rating} />

					<div>
						{"hdhs"}
						<button className='btn' onClick={handleBack}>
							<span>➥</span>
						</button>
						<button className='btn' onClick={handleAddStore}>
							<span>e854</span>
						</button>
						hdhdhdsy
					</div>
				</div>
			</div>
		</acticle>
	);
}

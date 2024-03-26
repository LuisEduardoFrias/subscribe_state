/** @format */

import useSuperState from "../super_state/lib/super_state.ts";

import Header from "./header";
import Animation, { transitions } from "./animation";
import Filter from "./filter";
import BasketDetails from "./basket_details";
import Basket from "./basket";
import HeaderBasket from "./header_basket";
import FooterBasket from "./footer_basket";
import ProductDetails from "./product_details";
import ShowProducts from "./show_products";

import Styles from "../styles/home.module.css";

export default function Home() {
	//
	const [state, dispatch] = useSuperState(["showProduct", "showBasketDetails"]);

	return (
		<div className={Styles.container}>
			<Header />
			<main>
				<section
					className={
						state.showBasketDetails || state.showProduct
							? Styles.detail
							: Styles.products
					}>
					{!state.showBasketDetails && (
						<>
							{!state.showProduct && (
								<Animation key={"BasketDetails"} className={Styles.filter}>
									{<Filter />}
								</Animation>
							)}
						</>
					)}

					<div className={Styles.content}>
						{state.showBasketDetails ? (
							<Animation
								key={"BasketDetails"}
								transition={transitions.transform}>
								<BasketDetails />
							</Animation>
						) : (
							<>
								{state.showProduct ? (
									<Animation key={"ProductDetails"}>
										<ProductDetails />
									</Animation>
								) : (
									<Animation key={"ShowProducts"}>
										<ShowProducts />
									</Animation>
								)}
							</>
						)}
					</div>
				</section>
				<aside>
					<div>
						<HeaderBasket />
					</div>
					<div>
						<Basket />
					</div>
					<div>
						<FooterBasket />
					</div>
				</aside>
			</main>
		</div>
	);
}

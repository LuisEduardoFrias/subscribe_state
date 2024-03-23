/** @format */

import React from "react";
import useSuperState from "../super_state/lib/super_state.ts";

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
			<header>header</header>
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
								<div className={Styles.filter}>{<Filter />}</div>
							)}
						</>
					)}

					<div className={Styles.content}>
						{state.showBasketDetails ? (
							<div>
								<BasketDetails />
							</div>
						) : (
							<>
								{state.showProduct ? (
									<div>
										<ProductDetails />
									</div>
								) : (
									<div>
										<ShowProducts />
									</div>
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

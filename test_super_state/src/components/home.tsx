/** @format */

import React, { useReducer } from "react";
import useSuperState from "../super_state/lib/super_state.ts";

import Filter from "./filter";
import Basket from "./basket";
import HeaderBasket from "./header_basket";
import FooterBasket from "./footer_basket";
import ProductDetails from "./product_details";
import ShowProducts from "./show_products";
import Styles from "../styles/home.module.css";

export default function Home() {

	//const [state, dispatch] = useSuperState(["all"]);

	const hh = true;
	return (
		<div className={Styles.container}>
			<header>header</header>

			<main>
				<section className={hh ? Styles.products : Styles.detail}>
					{hh && (
						<div className={Styles.filter}>
							<Filter />
						</div>
					)}
					<div className={Styles.content}>
						{hh ? (
							<div>
								<ShowProducts />
							</div>
						) : (
							<div>
								<ProductDetails />
							</div>
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

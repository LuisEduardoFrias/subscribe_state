/** @format */

import { memo } from "react";
import { dispatch } from "../super_state/lib/super_state.ts";
import { actions } from "../helpers/reducer";
import "../styles/header_basket.css";

const HeaderBasket = memo(function HeaderBasket() {
	function handleShowAll() {
		dispatch({ type: actions.show_basket_details, value: true });
	}

	return (
		<div className='header-basket-container'>
			<span>🛒 Basket</span>
			<a>
				<button className='btn' onClick={handleShowAll}>
					🔎 show all
				</button>
			</a>
		</div>
	);
});

export default HeaderBasket;

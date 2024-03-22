/** @format */

import Icon from "./icon";
import useSuperState from "../super_state/lib/super_state.ts";
import { actions } from "../helpers/reducer";
import "../styles/header_basket.css";

export default function HeaderBasket() {
	const [state, dispatch] = useSuperState([]);

	function handleShowAll() {
		dispatch({ type: actions.show_basket_details, value: true });
	}

	return (
		<div className='header-basket-container'>
			<span>🛒 Basket</span>
			<a>
				<button className='btn' onClick={handleShowAll}>
					
					<Icon>seach</Icon>
				</button>
			</a>
		</div>
	);
}

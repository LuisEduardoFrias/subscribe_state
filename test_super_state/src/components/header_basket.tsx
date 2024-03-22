/** @format */

import "../styles/header_basket.css";

export default function HeaderBasket() {
	return (
		<div className='header-basket-container'>
			<span>🛒 Basket</span>
			<a>
				<button className='btn'>🔎 show all</button>
			</a>
		</div>
	);
}

/** @format */

import {Rating} from  "../types/rating.ts";
import "../styles/rating.css";

export default function Rating({ rating }: { ranting: Rating }) {
	const filledStars = "★".repeat(Math.floor(rating.rate));
	const hasHalfStar = rating.rate % 1 >= 0.5;
	const middleStar = hasHalfStar ? "" /*"⯪"*/ : "";
	const emptyStars = "☆".repeat(5 - Math.ceil(rating.rate));

	return (
		<div className='rating-container'>
			<span> {filledStars + middleStar + emptyStars}</span>
			<span>📦 {rating.count}</span>
		</div>
	);
}

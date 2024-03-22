/** @format */

import {Rating} from "./rating.ts";

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: Rating;
};

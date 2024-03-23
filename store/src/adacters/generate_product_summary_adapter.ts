/** @format */

import { Product } from "../types/product";

export type productSummary = {
	product: Product;
	count: number;
};

export default function generateProductSummaryAdapter(
	store: Product[]
): productSummary[] {
	
		return store.reduce((summary: productSummary[], product: Product) => {
			const existingProduct = summary.find(p => p.product.id === product.id);
			if (existingProduct) {
				existingProduct.count++;
			} else {
				summary.push({ product, amount: 1 });
			}
			return summary;
		}, []);

}

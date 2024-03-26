/** @format */

import useSuperState from "../super_state/lib/super_state";
import { memo } from "react";
import { Product as Pd } from "../types/product";
import Product from "./product";
import "../styles/show_product.css";

const ShowProducts = memo(function ShowProducts() {
    const [{ products }, dispatch] = useSuperState(["products"]);

    return (
        <article className="show-products-container">
            {products ? (
                <ul>
                    {products.map((product: Pd, index: number) => (
                        <Product key={product.id} product={product} />
                    ))}
                </ul>
            ) : (
                <span>no hay productos</span>
            )}
        </article>
    );
});

export default ShowProducts;

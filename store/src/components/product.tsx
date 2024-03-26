/** @format */

import { dispatch } from "../super_state/lib/super_state";
import { actions } from "../helpers/reducer";
import { Product } from "../types/product";
import Rating from "./rating";
import "../styles/product.css";

export default function Product({ product }: { product: Product }) {
    //
    function handleAddDetail(evet) {
        dispatch({ type: actions.detailts, value: product });
    }

    return (
        <li>
            <a className="product-container" onClick={handleAddDetail}>
                <span>{product.title}</span>
                <img loading="lazy" src={product.image} alt={product.title} />
                <Rating rating={product.rating} />
            </a>
        </li>
    );
}

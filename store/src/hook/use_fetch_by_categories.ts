/** @format */

import { useEffect } from "react";
import { actions } from "../helpers/reducer";
import { dispatch } from "../super_state/lib/super_state";

export default function useFetchByCategories(category?: string) {
    const url: string = import.meta.env.VITE_PRODUCT_BY_CATREGORY.replace(
        "{_category_}",
        category
    );

    useEffect(() => {
        if (category) {
            fetch(url)
                .then(res => res.json())
                .then(json =>
                    dispatch({ type: actions.add_product, products: json })
                )
                .catch(err => console.log("fetch error: " + err));
        } else {
            console.log(new Error("the parameter 'category' is undefined"));
        }
    }, [category]);
}

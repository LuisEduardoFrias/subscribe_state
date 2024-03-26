/** @format */

import { useEffect } from "react";
import { actions } from "../helpers/reducer";
import { dispatch } from "../super_state/lib/super_state";

export default function useFetchByLimit(limit?: number) {
    const MIN = import.meta.env.VITE_LIMIT_FROM;
    const MAX = import.meta.env.VITE_LIMIT_TO;

    const url: string = import.meta.env.VITE_PRODUCT_BY_LIMIT.replace(
        "{_limit_}",
        limit
    );


    useEffect(() => {
        if (limit >= MIN || limit <= MAX) {
            fetch(url)
                .then(res => res.json())
                .then(json =>
                    dispatch({ type: actions.add_product, products: json })
                )
                .catch(err => console.log("fetch error: " + err));
        } else {
            console.log("the parameter 'limit' is undefined");
        }
    }, [limit]);
}

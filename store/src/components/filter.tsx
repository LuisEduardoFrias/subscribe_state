/** @format */

import React, { memo, useState } from "react";
import useFetchByCategories from "../hook/use_fetch_by_categories";
import useFetchByLimit from "../hook/use_fetch_by_limit.ts";
import { categories } from "../types/categories.d";
import "../styles/filter.css";

const Filter = memo(function Filter() {
    const MIN = import.meta.env.VITE_LIMIT_FROM;
    const MAX = import.meta.env.VITE_LIMIT_TO;

    const [_form, setForm] = useState({ limit: MIN });

    useFetchByCategories(_form.select);
    useFetchByLimit(_form.limit);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = [...new FormData(event.target).entries()];

        setForm({ ..._form, limit: data[1][1], search: data[0][1] });
    }

    function handleChageCategory(event: React.ChangeEvent<HTMLSelectElement>) {
        setForm({ ..._form, select: event.target.value });
    }

    return (
        <div className="filter-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Search products
                        <input
                            name="search"
                            placeholder="Shirt, trousors, dress ..."
                        />
                    </label>
                    <button className="btn">Search</button>
                </div>

                <div>
                    <div>
                        <label>
                            Select category
                            <select onChange={handleChageCategory}>
                                <option>{"No selected"}</option>
                                {Object.entries(categories).map(
                                    ([key, literal]) => (
                                        <option key={key} value={key}>
                                            {literal}
                                        </option>
                                    )
                                )}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Limit products
                            <input
                                name="limit"
                                placeholder="15, 20, 34 ..."
                                type="number"
                                min={MIN}
                                max={MAX}
                                defaultValue={MIN}
                            />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
});

export default Filter;

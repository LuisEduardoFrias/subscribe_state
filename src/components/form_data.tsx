/** @format */

import { useState } from "react";
import initialState from "../helpers/initial_state";
import useSuperState from "../hook/use_super_state";
import Reducer, { actions } from "../helpers/reducer";
import Form from "./form";
import "../styles/form_data.css";
//
export default function FormData() {
	const [index, setIndex] = useState(0);
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["persons"]);

	function handleSubmit(
		data: object[],
		setLoader: (show: boolean) => void
	): boolean {}

	function handleChange(event: any) {
		if (event.target.name === "persons") {
			setIndex(state.persons.findIndex(e => e.name === event.target.value));
		} else {
			dispatch({
				type: actions.updatePersons,
				index,
				value: event.target.value
			});
		}
	}

	return (
		<div className='component'>
			<span className='comp_name'>Form Data</span>
			<div className='formData_container'>
				<Form onSubmit={handleSubmit}>
					<select name='persons' onChange={handleChange}>
						{state.persons.map(
							(p: object, _index: number): JSX.Element => (
								<option key={_index} value={p.name}>
									{p.name}
								</option>
							)
						)}
					</select>
					{Reflect.ownKeys(state.persons[index]).map(
						(key: object, _index: number): JSX.Element => (
							<fieldset key={_index}>
								<label htmlFor={key}>{firtsUC(key)}</label>
								<input
									type={checkType(key, state.persons)}
									autocomplete='off'
									onChange={handleChange}
									name={key}
									defaultValue={state.persons[index][key]}
									id={key}
								/>
							</fieldset>
						)
					)}
				</Form>
			</div>
		</div>
	);
}

function firtsUC(value: string) {
	return value.substring(0, 1).toUpperCase() + value.substring(1, value.length);
}

function checkType(key: string, persons: object) {
	return isNaN(persons[0][key]) ? "text" : "number";
}

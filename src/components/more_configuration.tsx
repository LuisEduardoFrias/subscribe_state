/** @format */

import initialState from "../helpers/initial_state";
import useSuperState from "../hook/use_super_state";
import Reducer, { actions } from "../helpers/reducer";
import "../styles/more_configuration.css";
//
export default function MoreConfiguration() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"jsonStyle"
	]);

	console.log("MoreConfiguration : \n_____________\n" + JSON.stringify(state,null,2));

	const InterfacesColor = [
		{
			name: "braces",
			title: "Braces { }"
		},
		{
			name: "squareBrackets",
			title: "Square brackets [ ]"
		},
		{
			name: "colonComma",
			title: "Colon : and comma ,"
		},
		{
			name: "quotationMarks",
			title: "Quotation marks"
		},
		{
			name: "key",
			title: "key"
		},
		{
			name: "value",
			title: "value"
		}
	];

	function handleChange(event: any) {
		const prop: string = event.target.name;
		const value: string = event.target.value;

		dispatch({ type: actions.updateJsonStyle, prop, value });
	}

	return (
		<div className='component1'>
			<span className='comp_name'>Another Configuration</span>
			<div className='anotherConf'>
				{InterfacesColor.map((e: object, index: nunber) => (
					<fieldset key={index}>
						<label htmlFor={e.name}>{e.title}</label>
						<input
							type='color'
							name={e.name}
							id={e.name}
							onChange={handleChange}
							defaultValue={state.jsonStyle[e.name]}
						/>
					</fieldset>
				))}
			</div>
		</div>
	);
}

/** @format */

import initialState from "../helpers/initial_state";
import useSuperState from "../hook/use_super_state";
import Reducer from "../helpers/reducer";
import "../styles/more_configuration.css";
//
export default function MoreConfiguration() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"jsonStyle"
	]);

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

	function handleChange(event: any, propName: string) {
		//
		alert("hdjd")
	}

	return (
		<div className='component1'>
			<span className='comp_name'>Another Configuration</span>
			<div className='anotherConf'>
				{InterfacesColor.map((e: object, index: nunber) => (
					<fieldset>
						<label htmlFor={e.name}>{e.title}</label>
						<input
							type='color'
							name={e.name}
							id={e.name}
							onChange={(event: any) => handleChange(event, e.name)}
							defaultValue={state.jsonStyle[e.name]}
						/>
					</fieldset>
				))}
			</div>
		</div>
	);
}

/** @format */

import initialState from "../helpers/initial_state";
import useSuperState from "../hook/use_super_state";
import Reducer from "../helpers/reducer";
import "../styles/show_data.css";
//
export default function ShowData() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"persons",
		"jsonStyle"
	]);
	
	const braces: React.CSSProperties = { color: `${state.jsonStyle.braces}` };
	const squareBrackets: React.CSSProperties = { color: `${state.jsonStyle.squareBrackets}` };
	const colonComma : React.CSSProperties= { color: `${state.jsonStyle.colonComma}` };
	const quotationMarks: React.CSSProperties = { color: `${state.jsonStyle.quotationMarks}` };
	const _key: React.CSSProperties = { color: `${state.jsonStyle.key}` };
	const value: React.CSSProperties = { color: `${state.jsonStyle.value}` };

	return (
		<div className='component'>
			<span className='comp_name'>Show Data</span>
			<div className='showData_container'>
				<span className='obj_open' style={braces}>
					{"{"}
				</span>
				<div>
					<span style={_key}>{"person"}</span>
					<span style={colonComma}>{":"}</span>
					<span style={squareBrackets} className='array_open'>
						{"["}
					</span>
				</div>
				<div className='person'>
					{state.persons?.map((p: object, index: number) => (
						<div key={index}>
							<span style={braces} className='obj_open2'>
								{"{"}
							</span>
							{Reflect.ownKeys(p).map((key: string, ind: number) => (
								<div className='prop_container' key={ind}>
									<span style={_key}>{`"${key}" `}</span>
									<span style={colonComma}>:</span>
									<span style={value}>{` "${p[key]}",`}</span>
								</div>
							))}
							<span style={braces} className='obj_close2'>
								{"}"}
							</span>
							<span style={colonComma}>{","}</span>
						</div>
					))}
				</div>
				<span style={squareBrackets} className='array_close'>
					{"]"}
				</span>
				<span style={braces} className='obj_close'>
					{"}"}
				</span>
			</div>
		</div>
	);
}

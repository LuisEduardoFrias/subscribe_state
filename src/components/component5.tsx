/** @format */

import initialState from "../helpers/initial_state";
import useSuperState from "../hook/use_super_state";
import Reducer from "../helpers/reducer";

//const Component5 = React.memo(
function Component5() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"volume",
		"name"
	]);

	console.log("cp 5 : " + JSON.stringify(state));

	return (
		<div
			style={{
				display: "flex",
				fontFamily: "inherit",
				flexDirection: "column",
				width: "100%",
				boxSizen: "border-box",
				padding: "10px",
				gap: "15px",
				color: "white",
				border: "2px solid #dc00ba",
				backgroundColor: "#750063"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Component 5</span>
				<hr />
				<div>
					<span>Volume: </span>
					<span>{state.volume}</span>
				</div>
				<br />
				<input
					defaultValue={state.name}
					onChange={event =>
						dispatch({ type: "change_name", value: event.target.value })
					}
				/>
			</div>
		</div>
	);
}

export default Component5;

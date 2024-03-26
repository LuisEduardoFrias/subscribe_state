/** @format */

import Icon from "./icon";
import Animation from "./animation";

export default function Check({
	isChecked,
	setChecked
}: {
	isChecked: boolean;
	setChecked: (value: boolean) => void;
}) {
	function handleCheck() {
		setChecked(!isChecked);
	}

	const _Styles = {
		width: "35px",
		height: "35px",
		color: "#018e01",
		border: "1.3px solid #494949c6",
		borderRadius: "2px"
	};

	return (
		<button style={_Styles} className='btn' onClick={handleCheck}>
			{isChecked && (
				<Animation key={"Icon"}>
					<Icon wght={900}>check</Icon>
				</Animation>
			)}
		</button>
	);
}

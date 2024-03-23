/** @format */

export default function AmountControl({
	amount,
	setAmount
}: {
	amount: number;
	setAmount: (value: number) => void;
}) {
	function handleReducer(event) {
		setAmount(amount - 1);
	}

	function handleIncrease(event) {
		setAmount(amount + 1);
	}

	function handleChange(event: HTMLInputElement) {
		const _amount = Number(event.target.value);
		setAmount(_amount === 0 ? 1 : _amount);
	}

	const _Styles = {
		width: "150px",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center"
	};

	const _Btn = {
		height: "35px",
		width: "35px",
		fontSize: "18px",
		fontWeight: "bold",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	const _Input = {
		width: "50px",
		textAlign: "center",
		fontSize: "27px"
	};

	return (
		<div style={_Styles}>
			<button style={_Btn} className='btn' onClick={handleReducer}>
				-
			</button>
			<input
				style={_Input}
				type='number'
				value={amount}
				onChange={handleChange}
			/>
			<button style={_Btn} className='btn' onClick={handleIncrease}>
				+
			</button>
		</div>
	);
}

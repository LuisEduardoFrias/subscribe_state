/** @format */

export default class Person {
	dispatch: (value: object) => void;
	isAwake: boolean;
	isEating: boolean;
	isTalking: boolean;
	isSleeping: boolean;

	constructor() {
		this.dispatch = undefined;
		this.isAwake = true;
		this.isEating = false;
		this.isTalking = false;
		this.isSleeping = false;
	}

	sleep() {
		this.dispatch({
			type: "update_Person",
			value: {
				isSleeping: true,
				isAwake: false,
				isTalking: false,
				isEating: false
			}
		});
		
	}

	talk() {
		if (this.isAwake) {
			this.dispatch({
				type: "update_Person",
				value: { isTalking: true, isEating: false }
			});
		} else alert("You are sleeping");
	}

	eat() {
		if (this.isAwake) {
			this.dispatch({
				type: "update_Person",
				value: { isEating: true, isTalking: false }
			});
		} else alert("You are sleeping");
	}

	wakeUp() {
		alert("---- : " + this.isSleeping);
		if (this.isSleeping)
			this.dispatch({
				type: "update_Person",
				value: { isAwake: true, isSleeping: false }
			});
	}
}

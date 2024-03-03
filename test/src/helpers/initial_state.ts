/** @format */

import Person from "./person";

export default function initialState() {
	return {
		isTyping: false,
		text: "",
		name: "Luis Eduardo",
		signature: "Luis E.F.",
		age: 13,
		hasLicense: false,
		hasPension: false,
		person: new Person()
	};
}

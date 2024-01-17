/** @format */

export enum actions {
	up_age = "up_age",
	change_color = "change_color",
	change_volume = "change_volume",
	change_name = "change_name",
	updateJsonStyle = "updateJsonStyle",
	updateAppStyle = "updateAppStyle",
	updateFormStyle = "updateFormStyle",
	updateFontFamily = "updateFontFamily",
	updatePersons = "updatePersons"
}

export default function Reducer(state: any, action: any) {
	const _action = {
		up_age: () => {
			return { ...state, age: action.value };
		},
		change_color: () => {
			return { ...state, color: action.value };
		},
		change_volume: () => {
			return { ...state, volume: action.value };
		},
		change_name: () => {
			return { ...state, name: action.value };
		},
		updateJsonStyle: () => {
			state.jsonStyle[action.prop] = action.value;
			return { ...state };
		},
		updateAppStyle: () => {
			state.appStyle[action.prop] = action.value;
			return { ...state };
		},
		updateFormStyle: () => {
			state.formStyle[action.prop] = action.value;
			return { ...state };
		},
		updateFontFamily: () => {
			return { ...state, fontFamily: action.value };
		},
		updatePersons: () => {
			state.persons[action.index] = action.value;
			return { ...state };
		}
	};

	return _action[action.type]();
}

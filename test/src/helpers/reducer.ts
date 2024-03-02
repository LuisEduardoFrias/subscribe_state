/** @format */

export enum actions {
	typing = "typing",
	send_writed = "send_writed",
	change_signature = "change_signature",
	update_age = "update_age",

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
	//
	const _action = {
		typing: () => {
			state.isTyping = action.value;
			return state;
		},
		send_writed: () => {
			state.text = action.value;
			return state;
		},
		change_signature: () => {
			state.signature = action.value;
			return state;
		},
		update_age: () => {
			state.age = action.value;
			return state;
		},
		default: () => {
			alert(`El type: ${action.type} no existe`);
			return undefined;
		}
	};

	return (_action[action.type] ?? _action["default"])();
}

/*
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
			const updatedJsonStyle = {
				...state.jsonStyle,
				[action.prop]: action.value
			};
			return { ...state, jsonStyle: updatedJsonStyle };
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
			state.persons[action.index][action.prop] = action.value;
			return { ...state };
		}
*/

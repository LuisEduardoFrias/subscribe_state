/** @format */

import { Mapper } from "../../../index";
export enum actions {
	typing = "typing",
	send_writed = "send_writed",
	change_signature = "change_signature",
	update_age = "update_age",
	change_name = "change_name",
	get_licence = "get_licence",
	get_pension = "get_pension",
	update_Person = "update_Person"
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
		change_name: () => {
			state.name = action.value;
			return state;
		},
		get_licence: () => {
			state.hasLicense = action.value;
			return state;
		},
		get_pension: () => {
			state.hasPension = action.value;
			return state;
		},
		update_Person: () => {
			Mapper(state.person, action.value);
			return state;
		},
		default: () => {
			alert(`El type: ${action.type} no existe`);
			return undefined;
		}
	};

	return (_action[action.type] ?? _action["default"])();
}

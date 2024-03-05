/** @format */

import {
	Action,
	Reducer,
	ALL,
	UPDATE_OBTION_ID,
	SUB_CRIBER,
	GLOBAL_STATE
} from "./types_constans";

//exact comparison of two objects
function Equal(obj1: any, obj2: any) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function setObj(obj: object, prop: string, value: any): void {
	Reflect.set(obj, prop, value);
}

export function getKeys(obj: object): string[] {
	return Reflect.ownKeys(obj);
}

//SubCribe the components
export function SubCribe(
	props: string[],
	id: string,
	dispatch: (action: Action) => object
): void {
	if (!SUB_CRIBER[id]) {
		setObj(SUB_CRIBER, id, {
			props,
			wasCalled: false,
			disp: dispatch
		});
	}
}

//Clone object
export function Clone(obj) {
	const clonedObj = { ...JSON.parse(JSON.stringify(obj)) };
	addMethods(clonedObj, obj);
	return clonedObj;
}

function addMethods(clonedObj, originalObj) {
	for (let prop in originalObj) {
		if (Array.isArray(originalObj[prop])) {
			clonedObj[prop] = originalObj[prop].slice();
		} else if (
			typeof originalObj[prop] === "object" &&
			typeof originalObj[prop] !== "function" &&
			originalObj[prop] !== null
		) {
			clonedObj[prop] = {};
			addMethods(clonedObj[prop], originalObj[prop]);
		} else if (
			typeof originalObj[prop] === "function" &&
			prop !== "constructor"
		) {
			clonedObj[prop] = originalObj[prop].bind(clonedObj);
		} else {
			clonedObj[prop] = originalObj[prop];
		}
	}
	const prototype = Object.getPrototypeOf(originalObj);
	if (prototype !== null) {
		const prototypeMethods = Object.getOwnPropertyNames(prototype);
		prototypeMethods.forEach(prop => {
			if (typeof prototype[prop] === "function" && prop !== "constructor") {
				clonedObj[prop] = prototype[prop].bind(clonedObj);
			}
		});
	}
}

//Mapper an object
export function Mapper(obj: object, obj2: object) {
	getKeys(obj2).forEach((key: string) => {
		obj[key] = obj2[key];
	});
}

//intermediator of the dispatch
export function MiddleDistpach(action: Action, reducer: Reducer): void {
	//

	const methods2 = Object.getOwnPropertyNames(GLOBAL_STATE.person);
	const methodsH2 = Object.getOwnPropertyNames(
		Object.getPrototypeOf(GLOBAL_STATE.person)
	);

	const allMethods2 = methods2.concat(methodsH2);

	const newState: object = reducer(Clone(GLOBAL_STATE), action);

	const changedProperties = GetChangedProperties(GLOBAL_STATE, newState);

	UpdateGlobalState(newState, changedProperties);

	changedProperties.forEach((p: string) => {
		for (let key in SUB_CRIBER) {
			SUB_CRIBER[key].props.forEach((pr: string) => {
				if ((p === pr || pr === ALL) && SUB_CRIBER[key].wasCalled === false) {
					SUB_CRIBER[key].disp({ type: UPDATE_OBTION_ID });
					SUB_CRIBER[key].wasCalled = true;
				}
			});
		}
	});

	for (let key in SUB_CRIBER) {
		SUB_CRIBER[key].wasCalled = false;
	}
}

//retorna las propiedades que an sido actializadas.
function GetChangedProperties(oldState: object, newState: object): string[] {
	const changedProperties: string[] = [];
	for (const key in newState) {
		if (!Equal(oldState[key], newState[key])) changedProperties.push(key);
	}
	return changedProperties;
}

//update the global state
function UpdateGlobalState(
	newState: object,
	modifiedProperties: string[]
): void {
	if (getKeys(GLOBAL_STATE).length === 0) {
		getKeys(newState).forEach((key: string) =>
			setObj(GLOBAL_STATE, key, newState[key])
		);
	} else {
		modifiedProperties.forEach((key: string) => {
			setObj(GLOBAL_STATE, key, newState[key]);
		});
	}
}

//returns the state with the specific properties of a subscriber
export function ReturnStateForSubscribe(state: object, callerFunction: string) {
	const methods = Object.getOwnPropertyNames(state.person);
	const methodsH = Object.getOwnPropertyNames(
		Object.getPrototypeOf(state.person)
	);

	const allMethods = methods.concat(methodsH);

	const newState = {};

	if (SUB_CRIBER[callerFunction]) {
		const pros: string[] = SUB_CRIBER[callerFunction].props;

		for (let i: number = 0; i < pros.length; i++) {
			if (pros[i] === ALL) return state;

			setObj(newState, pros[i], state[pros[i]]);
		}
	}

	return newState;
}

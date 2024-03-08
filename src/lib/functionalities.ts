/** @format */

import {
	Action,
	OutReducer,
	Reducer,
	GlobalState,
	AnyObject,
	Dispatch,
	SubCriber
} from "./types";
import { ALL, SUB_CRIBER, GLOBAL_STATE } from "./constants";

//exact comparison of two objects
function equal(obj1: GlobalState, obj2: GlobalState) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function setObj(obj: object, prop: string, value: any): void {
	Reflect.set(obj, prop, value);
}

export function getKeys(obj: object): string[] {
	return Reflect.ownKeys(obj) as string[];
}

//subCribe the components

export function subCribe(
	props: string[],
	id: string,
	dispatch: Dispatch
): void {
	if (!SUB_CRIBER[id]) {
		/*
		setObj(SUB_CRIBER, id, {
			props,
			wasCalled: false,
			dispatch
		});
		*/
		SUB_CRIBER[id] = {
			props,
			wasCalled: false,
			dispatch
		};
	}
}

//clone object
export function clone(obj: GlobalState): GlobalState {
	const clonedObj = { ...JSON.parse(JSON.stringify(obj)) };
	addMethods(clonedObj, obj);
	return clonedObj;
}

function addMethods(clonedObj: GlobalState, originalObj: GlobalState) {
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

//mapper an object
export function mapper<T extends Record<string, any>>(
	obj: T,
	obj2: Partial<T>
) {
	getKeys(obj2).forEach((key: keyof T) => {
		obj[key] = obj2[key]!;
	});
}

//intermediator of the dispatch
export function middleDistpach(action: Action, reducer: Reducer): void {
	//

	const newState: GlobalState = reducer(clone(GLOBAL_STATE), action);

	const changedProperties = getChangedProperties(GLOBAL_STATE, newState);

	updateGlobalState(newState, changedProperties);

	changedProperties.forEach((p: string) => {
		for (let key in SUB_CRIBER) {
			SUB_CRIBER[key].props.forEach((pr: string) => {
				if ((p === pr || pr === ALL) && SUB_CRIBER[key].wasCalled === false) {
					SUB_CRIBER[key].wasCalled = true;
					SUB_CRIBER[key].dispatch({ type: "any" });
				}
			});
		}
	});

	for (let key in SUB_CRIBER) {
		SUB_CRIBER[key].wasCalled = false;
	}
}

//retorna las propiedades que an sido actializadas.
function getChangedProperties(
	oldState: GlobalState,
	newState: GlobalState
): string[] {
	const changedProperties: string[] = [];
	for (const key in newState) {
		if (!equal(oldState[key], newState[key])) {
			changedProperties.push(key);
		}
	}
	return changedProperties;
}

//update the global state
function updateGlobalState(
	newState: AnyObject,
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
export function returnStateForSubscribe(
	state: AnyObject,
	callerFunction: string
) {
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

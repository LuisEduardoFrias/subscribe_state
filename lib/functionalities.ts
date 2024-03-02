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

//SubCribe the components
export function SubCribe(
	props: string[],
	id: string,
	dispatch: (action: Action) => object
): void {
	if (!SUB_CRIBER[id]) {
		Reflect.set(SUB_CRIBER, id, {
			props,
			wasCalled: false,
			disp: dispatch
		});
	}
}

//Clone object
function Clone(obj: object) {
	return { ...JSON.parse(JSON.stringify(obj)) };
}

//intermediator of the dispatch
export function MiddleDistpach(action: Action, reducer: Reducer): void {
	//
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
	if (Reflect.ownKeys(GLOBAL_STATE).length === 0) {
		Reflect.ownKeys(newState).forEach((key: string) =>
			Reflect.set(GLOBAL_STATE, key, newState[key])
		);
	} else {
		modifiedProperties.forEach((key: string) => {
			Reflect.set(GLOBAL_STATE, key, newState[key]);
		});
	}
}

//returns the state with the specific properties of a subscriber
export function ReturnStateForSubscribe(state: object, callerFunction: string) {
	const newState = {};

	if (SUB_CRIBER[callerFunction]) {
		const pros: string[] = SUB_CRIBER[callerFunction].props;

		for (let i: number = 0; i < pros.length; i++) {
			if (pros[i] === ALL) return state;

			Reflect.set(newState, pros[i], state[pros[i]]);
		}
	}

	return newState;
}

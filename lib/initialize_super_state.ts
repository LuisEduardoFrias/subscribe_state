/** @format */
//

import { Reducer, Action, AnyObject, GlobalState } from "./types";
import { getKeys, setObj } from "./functionalities";

export default function useInitialize(
	reducer?: Reducer,
	initialState?: AnyObject
): Initialize {
	return Initialize.Instance(reducer, initialState);
}

export class Initialize {
	private _reducer: Reducer;
	private _globalState: GlobalState;
	private static instance: Initialize;

	public static Instance(
		reducer?: Reducer,
		initialState?: AnyObject
	): Initialize {
		if (!Initialize.instance) {
			if (!reducer || !initialState) {
				throw Error(
					`${!reducer && "the reducer parameter is required for instance."}${
						!initialState && "\nthe reducer parameter is required for instance."
					}`
				);
			}

			Initialize.instance = new Initialize(reducer, initialState);
		}

		return Initialize.instance;
	}

	private constructor(reducer: Reducer, initialState: AnyObject) {
		this._reducer = reducer;
		this._globalState = initialState;
	}

	private defaultReducer(state: GlobalState, action: Action): GlobalState {
		console.log("undefined reducer");
		return {};
	}

	public clone(): this {
		const clonedInstance = Object.create(this);

		Reflect.set(clonedInstance,"reducer", this._reducer);
		Reflect.set(clonedInstance,"globalState", { ...this._globalState });
		return clonedInstance;
	}

	public get globalState(): GlobalState {
		return this._globalState;
	}

	public get reducer(): Reducer {
		return this._reducer;
	}

	updateGlobalState(newState: AnyObject, modifiedProperties: string[]): void {
		if (getKeys(this._globalState).length === 0) {
			getKeys(newState).forEach((key: string) =>
				setObj(this._globalState, key, newState[key])
			);
		} else {
			modifiedProperties.forEach((key: string) => {
				setObj(this._globalState, key, newState[key]);
			});
		}
	}
}

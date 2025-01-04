
import { Action, Subscribers, Subscriber, ALL } from './types.js';

export class Warehouse<T extends object, K extends { [key in keyof K]: Action }> {
	private _globalState: T;
	private _Actions: { [key in keyof K]: Action };
	private _subscriber: Subscribers;

	private static _instance: Warehouse<any, any>;

	public static getInstance<J extends object, I extends { [key in keyof I]: Action }>(initialState?: J & I): Warehouse<J, I> {

		if (!Warehouse._instance) {
			if (!initialState) throw new Error("You must provide a value for the 'initialState' argument.");

			Warehouse._instance = new Warehouse<J, I>(initialState);
		}

		return Warehouse._instance;
	}

	private constructor(initialState: T & K) {
		const [state, actions] = this.splitState(initialState);

		this._globalState = state as T;
		this._Actions = actions as K;
		this._subscriber = {} as Subscribers;
	}

	public get globalState(): T {
		return this._globalState;
	}

	public get actions(): { [key in keyof K]: Action } {
		return this._Actions;
	}

	public get subscriber(): Subscribers {
		return this._subscriber;
	}

	public setSubscriber(subscriber: Subscriber, componentName: string) {
		Reflect.set(this._subscriber, componentName, subscriber);
	}

	private splitState<T extends object, K extends { [key in keyof K]: Action }>(initialState: T & K): [T, K] {
		const state: T = {} as T;
		const functions: K = {} as K;
		type TKeys = keyof T;
		type KKeys = keyof K;

		for (const key in initialState) {
			if (typeof initialState[key as TKeys & KKeys] === 'function') {
				functions[key as KKeys] = initialState[key as KKeys] as K[KKeys];
			} else {
				state[key as TKeys] = initialState[key as TKeys] as T[TKeys];
			}
		}

		return [state, functions];
	}

	//returns the state with the specific properties of a subscriber
	public getGlobalStateBySubscriber(componentName: string): Partial<T> {
		const subscriber = Reflect.get(this._subscriber, componentName);

		if (!subscriber) throw new Error(`The subscriber ${componentName} not exists.`);

		if (subscriber.props.includes(ALL)) {
			return structuredClone(this.globalState);
		}

		const newState: Partial<T> = {};
		for (const prop of subscriber.props) {
			newState[prop as keyof T] = this.globalState[prop as keyof T];
		}

		return structuredClone(newState);
	}

	public updateGlobalState(newState: T, modifiedProperties: (keyof T)[]): void {
		for (const key of modifiedProperties) {
			this._globalState[key] = newState[key];
		}
	}
}

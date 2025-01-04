
import { Action, Update, UpdateState, ALL } from './types.js';
import { Warehouse } from './warehouse.js';

export function useActions<T extends { [key in keyof T]: Action }>(actions?: string | string[]): { [key in keyof T]: Action } {
	const warehouse = Warehouse.getInstance<object, T>();

	if (!actions || actions === ALL) return warehouse.actions;

	const _actions = Array.isArray(actions) ? actions : [actions];

	const functionsAction = _actions.reduce<{ [key in keyof T]: Action }>((acc, action) => {
		acc[action as keyof T] = warehouse.actions[action as keyof T];
		return acc;
	}, {} as { [key in keyof T]: Action });

	return functionsAction;
}

export function update<T extends object>(updateState: UpdateState) {
	const warehouse = Warehouse.getInstance<T, any>();
	dispatch(updateState<T>(structuredClone(warehouse.globalState)))
}

export function createWarehouse<T extends object, K extends { [key in keyof K]: Action }>(createInitialState: (update: Update) => T & K | (T & K)) {
	const isFunttion = typeof createInitialState === 'function';
	Warehouse.getInstance<T, K>(isFunttion ? createInitialState(update) : createInitialState);
}

function dispatch<T extends object, K extends { [key in keyof K]: Action }>(newState: T): void {
	const warehouse = Warehouse.getInstance<T, K>();

	const changedProperties = getChangedProperties<T>(newState, warehouse.globalState);

	if (changedProperties.length === 0) {
		return;
	}

	warehouse.updateGlobalState(newState, changedProperties);

	for (const subscriber of Object.values(warehouse.subscriber)) {
		if (
			subscriber.props.includes(ALL) ||
			subscriber.props.some((prop) => changedProperties.includes(prop as keyof T))
		) {
			subscriber.dispatch();
		}
	}
}

function equal<T>(obj1: T, obj2: T): boolean {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function getChangedProperties<T extends object>(newState: T, oldState: T): (keyof T)[] {
	return Object.keys(newState)
		.filter((key) => !equal(oldState[key as keyof T], newState[key as keyof T])) as (keyof T)[];
}

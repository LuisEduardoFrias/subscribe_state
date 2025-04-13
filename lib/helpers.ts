import { Update, UpdateState, ALL } from './types.js';
import { Warehouse } from './warehouse.js';

export function useActions<T>(actions?: string | string[]): T {
	const warehouse = Warehouse.getInstance<object, T>();

	if (!actions || actions === ALL) return warehouse.actions;

	const _actions = Array.isArray(actions) ? actions : [actions];

	const functionsAction = _actions.reduce<T>((acc, action) => {
		acc[action as keyof T] = warehouse.actions[action as keyof T];
		return acc;
	}, {} as T);

	return functionsAction;
}

export function update<T extends object>(updateState: UpdateState) {
	const warehouse = Warehouse.getInstance<T, object>();
	dispatch(updateState<T>(cloneObjectWithFunctions(warehouse.globalState)))
}

export function createWarehouse<T extends object, K >(createInitialState: ((update: Update) => T & K) | (T & K)) {
	const isFunttion = typeof createInitialState === 'function';
	Warehouse.getInstance<T, K>(isFunttion ? createInitialState(update) : createInitialState);
}

function dispatch<T extends object, K>(newState: T): void {
	const warehouse = Warehouse.getInstance<T, K>();

	const changedProperties = getChangedProperties<T>(newState, warehouse.globalState);

	if (changedProperties.length === 0) {
		return;
	}

	warehouse.updateGlobalState(newState, changedProperties);

	for (const subscriber of Object.values(warehouse.subscriber)) {
		if (subscriber.props.includes(ALL) || subscriber.props.some((prop) => changedProperties.includes(prop as keyof T))) {
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

export function cloneObjectWithFunctions(obj: any): any {
  const functions: Record<string, Function> = {};
  const objectWithoutFunctions: Record<string, any> = {};

  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      functions[key] = obj[key];
    } else {
      objectWithoutFunctions[key] = obj[key];
    }
  }

  let clonedObjectWithoutFunctions: any = null;
  try {
    clonedObjectWithoutFunctions = structuredClone(objectWithoutFunctions);
  } catch (error) {
    console.error("Error during structuredClone:", error);
    // In case of error, you might want to return a shallow copy or handle it differently
    clonedObjectWithoutFunctions = { ...objectWithoutFunctions };
  }

  return { ...clonedObjectWithoutFunctions, ...functions };
}

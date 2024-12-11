
import { Action, Update, UpdateState, ALL } from './types.js';
import { Warehouse } from './warehouse.js';

export function useActions<T extends { [key in keyof T]: Action }>(actions: string | string[]): { [key in keyof T]: Action } {
  const warehouse = Warehouse.getInstance<any, T>();

  const _actions = Array.isArray(actions) ? actions : [actions];

  if (_actions[0] === ALL) return warehouse.actions;

  const functionsAction = {} as T;

  for (const _action of _actions) {
    Reflect.set(functionsAction, _action, warehouse.actions[_action as keyof T])
  }

  return functionsAction;
}

export function update<T extends object>(updateState: UpdateState) {
  const warehouse = Warehouse.getInstance<T, any>();
  dispatch(updateState<T>(structuredClone(warehouse.globalState)))
}

export function createWarehouse<T extends object, K extends { [key in keyof K]: Action }>(createInitialState: (update: Update) => T & K) {
  Warehouse.getInstance<T, K>(createInitialState(update));
}

function dispatch<T extends object, K extends { [key in keyof K]: Action }>(newState: T): void {

  const warehouse = Warehouse.getInstance<T, K>();

  const changedProperties: (keyof T)[] = getChangedProperties<T>(
    newState,
    warehouse.globalState
  );

  if (changedProperties.length === 0) return;

  warehouse.updateGlobalState(newState, changedProperties);

  for (const subscriber of Object.values(warehouse.subscriber)) {
    for (const prop of subscriber.props) {
      if (changedProperties.includes(prop as keyof T) || prop === ALL) {
        const promesa = new Promise((resolve, _) => {
          subscriber.dispatch();
          resolve(true);
        });

        promesa.then((_) => { });
        break;
      }
    }
  }
}

function equal<T>(obj1: T, obj2: T): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function getChangedProperties<T extends object>(newState: T, oldState: T): (keyof T)[] {
  const changedProperties: (keyof T)[] = [];

  for (const key of Object.keys(newState) as (keyof T)[]) {
    if (!equal(oldState[key], newState[key])) {
      changedProperties.push(key);
    }
  }

  return changedProperties;
}

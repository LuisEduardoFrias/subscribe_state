
import { Action, Update, UpdateState } from './types.js';
import { ALL } from './constants.js';
import { Warehouse } from './warehouse.js';

export function useActions<T extends { [key in keyof T]: Action }>(actions: string | string[]): T {
  const warehouse = Warehouse.getInstance();

  const _actions = Array.isArray(actions) ? actions : [actions];

  if (_actions[0] === ALL) return warehouse.actions;

  const functionsAction = {} as T

  for (const _action of _actions) {
    Reflect.set(functionsAction, _action, warehouse.actions[_action as keyof T])
  }

  return functionsAction;
}

export function update<T extends object>(updateState: UpdateState) {
  dispatch(updateState<T>(structuredClone(Warehouse.globalState)))
}

export function createWarehouse<T extends object, K extends { [key in keyof K]: Action }>(createInitialState: (update: Update) => T & K) {
  let warehouse: Warehouse;
  warehouse = Warehouse.getInstance<T, K>(createInitialState(update));
}

function dispatch<T extends object, K extends { [key in keyof K]: Action }>(newState: T): void {

  const warehouse = Warehouse.getInstance<T, K>();

  const changedProperties: (keyof T)[] = getChangedProperties<T>(
    newState,
    warehouse.globalState
  );

  if (changedProperties.length === 0) return;

  warehouse.updateGlobalState(newState, changedProperties);

  for (const subscriber in warehouse.subscriber) {
    for (const prop of subscriber.props) {
      if (hangedProperties.includes(prop) || prop === ALL) {
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

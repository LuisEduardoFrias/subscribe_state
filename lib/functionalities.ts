/**
 */
import { Action, Reducer, Dispatch } from './types.js';
import { ALL, SUB_CRIBER } from './constants.js';
import { Initialize } from './initialize_super_state.js';

//exact comparison of two objects
function equal<T>(obj1: T, obj2: T) {
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
  SUB_CRIBER[id] = {
    props,
    dispatch,
  };
}

//intermediator of the dispatch
export function middleDistpach<T>(action: Action, reducer: Reducer): void {
  //
  const initialized = Initialize.getInstance<T>();

  const newState: T = reducer<T>(initialized.globalState, action);

  const changedProperties: (keyof T)[] = getChangedProperties<T>(
    initialized.globalState,
    newState
  );

  initialized.updateGlobalState(newState, changedProperties);

  //Probocar el cambio de estado en los useReducers de los suscriptores.
  if (changedProperties.length > 0) {
    const fn = (key: string | symbol) => {
      const props = Reflect.get(SUB_CRIBER, key).props;

      for (let i = 0; i < props.length; i++) {
        let isBreak = false;

        for (let j = 0; j < changedProperties.length; j++) {
          if (
            changedProperties[j] === props[i] ||
            changedProperties[j] === ALL
          ) {
            const promesa = new Promise((resolve, _) => {
              SUB_CRIBER[key as string].dispatch({ type: 'any' });
              resolve(true);
            });
            promesa.then((_) => {});

            isBreak = true;
            break;
          }
        }

        if (isBreak) {
          isBreak = false;
          break;
        }
      }
    };

    Reflect.ownKeys(SUB_CRIBER).forEach(fn);
  }
}

function getChangedProperties<T>(oldState: T, newState: T): (keyof T)[] {
  const changedProperties: (keyof T)[] = [];

  for (const key of Object.keys(newState as object) as (keyof T)[]) {
    if (!equal(oldState[key], newState[key])) {
      changedProperties.push(key);
    }
  }

  return changedProperties;
}

//returns the state with the specific properties of a subscriber
export function returnStateForSubscribe<T>(
  state: T,
  callerFunction: string
): T {
  let newState = {};

  if (SUB_CRIBER[callerFunction]) {
    const pros: string[] = SUB_CRIBER[callerFunction].props;

    for (let i: number = 0; i < pros.length; i++) {
      if (pros[i] === ALL) return state;

      setObj(newState, pros[i], state[pros[i] as keyof T]);
    }
  }

  return newState as T;
}

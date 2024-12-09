
import { setInitialState } from './types'

export default function warehouse<T>(setState: setInitialState) {


  type reference = { state: T };

  const refState = { current: { state: null } };

  const _update = (_fn: functSetterType) => {
    const newState = _fn<T>(refState.current.state!);

    refState.current = { state: newState };
    console.log(newState)
  }

  refState.current = { state: setState<T>(_update) as T };


  const functions: { [key: string]: Function } = {};

  for (const key in refState.current?.state!) {
    if (typeof refState.current.state![key] === 'function') {
      functions[key] = refState.current.state![key] as Function;
    }
  }

  return (ar: string[]) => ({
    state: ar.filter((key: string) => refState.current.state![key]),
    actions: functions
  });
}


export class Initialize<T>{
  private _globalState: T;
  private static _instance: Initialize<any>;

  public static getInstance<J>(initialState: J): Initialize<J> {
    if (!Initialize._instance) {
      if (!initialState)
        throw new Error('The initialState parameter is required for generat the global state warehouse.');

      Initialize._instance = new Initialize<J>(initialState);
    }

    return Initialize._instance;
  }

  private constructor(initialState: T) {
    this._globalState = initialState;
  }

  public get globalState(): T {
    return this._globalState;
  }

}


/*
  private cloneObjectWithSeparateFunctions(originalObject: T): T {
    const functions: { [key: string]: Function } = {};

    for (const key in originalObject) {
      if (typeof originalObject[key] === 'function') {
        functions[key] = originalObject[key] as Function;
        delete originalObject[key];
      }
    }

    const clonedObject = structuredClone(originalObject);

    Object.assign(clonedObject, functions);

    return clonedObject;
  }

  updateGlobalState(newState: T, modifiedProperties: (keyof T)[]): void {
    if (getKeys(this._globalState as object).length === 0) {
      getKeys(newState as object).forEach((key: string) =>
        setObj(this._globalState as object, key, newState[key as keyof T])
      );
    } else {
      modifiedProperties.forEach((key: keyof T) => {
        setObj(this._globalState as object, key as string, newState[key]);
      });
    }
  }
  */
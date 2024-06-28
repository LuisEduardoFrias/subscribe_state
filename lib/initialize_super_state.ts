//
import { Reducer } from './types.js';
import { getKeys, setObj } from './functionalities.js';

export default function useInitialize<T>(
  reducer?: Reducer,
  initialState?: T
): void {
  Initialize.getInstance(reducer, initialState);
}

export class Initialize<T> {
  private _reducer: Reducer;
  private _globalState: T;
  private static _instance: Initialize<any>;

  public static getInstance<J>(
    reducer?: Reducer,
    initialState?: J
  ): Initialize<J> {
    if (!Initialize._instance) {
      if (!reducer || !initialState)
        throw new Error(
          `${
            !reducer
              ? 'The reducer parameter is required for instance Initialize.'
              : ''
          }${!reducer && !initialState ? '\n' : ''}${
            !initialState
              ? 'The initialState parameter is required for instance Initialize.'
              : ''
          }`
        );

      Initialize._instance = new Initialize<J>(reducer, initialState);
    }

    return Initialize._instance;
  }

  private constructor(reducer: Reducer, initialState: T) {
    this._reducer = reducer;
    this._globalState = initialState;
  }

  public get globalState(): T {
    return structuredClone(this._globalState);
  }

  public get reducer(): Reducer {
    return this._reducer;
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
}

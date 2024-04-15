//
import { Reducer, Action, AnyObject, GlobalState } from "./types";
import { getKeys, setObj } from "./functionalities";

// declare global {
//     var instance: Initialize;
// }

export default function useInitialize<T extends object>(
    reducer?: (state: T, action: AnyObject) => T,
    initialState?: T
): void {
    Initialize.getInstance<T>(reducer, initialState);
}

export class Initialize<K extends object> {
    private _reducer: Reducer;
    private _globalState: K;
    private static _instance: Initialize<k>;

    public static getInstance<T extends object>(
        reducer?: (state: T, action: AnyObject) => T,
        initialState?: T
    ): Initialize<k> {
        if (!Initialize._instance) {
            if (!reducer || !initialState)
                throw new Error(`${!reducer ? "The reducer parameter is required for instance Initialize." : ""}${!reducer && !initialState ? "\n" : ""}${!initialState ? "The initialState parameter is required for instance Initialize." : ""}`);

            Initialize._instance = new Initialize<T>(reducer, initialState);
        }

        return Initialize._instance;
    }

    private constructor(reducer: (state: K, action: AnyObject) => K, initialState: K) {
        this._reducer = reducer;
        this._globalState = initialState;
    }

    public get globalState(): K {
        /*
        let aux = ({ name: "function name", value: this._globalState["function name"] });
        Reflect.deleteProperty(this._globalState, "function name");

        const clone: K = structuredClone(this._globalState);
        Reflect.set(clone, aux.name, aux.value)
        */

        return structuredClone(this._globalState);
    }

    public get reducer(): (state: K, action: AnyObject) => K {
        return this._reducer;
    }

    updateGlobalState(newState: K, modifiedProperties: string[]): void {
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
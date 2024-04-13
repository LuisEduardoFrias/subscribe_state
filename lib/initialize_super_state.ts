/** @format */
//

import { Reducer, Action, AnyObject, GlobalState } from "./types";
import { getKeys, setObj } from "./functionalities";

// declare global {
//     var instance: Initialize;
// }

export default function useInitialize(
    reducer?: Reducer,
    initialState?: AnyObject
): void {
    Initialize.getInstance(reducer, initialState);
}

export class Initialize {
    private _reducer: Reducer;
    private _globalState: GlobalState;
    private static _instance: Initialize;

    public static getInstance(
        reducer?: Reducer,
        initialState?: AnyObject
    ): Initialize {
        if (!Initialize._instance) {
            if (!reducer || !initialState) 
                throw new Error(`${!reducer ? "The reducer parameter is required for instance Initialize." : ""}${!reducer && !initialState ? "\n" : ""}${!initialState ? "The initialState parameter is required for instance Initialize." : ""}`);

            Initialize._instance = new Initialize(reducer, initialState);
        }

        return Initialize._instance;
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

        setObj(clonedInstance, "reducer", this._reducer);
        setObj(clonedInstance, "globalState", { ...this._globalState });
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
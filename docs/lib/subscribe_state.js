"use strict";
//
/*
import { useReducer } from "react";

import { Reducer, Action, AnyObject, GlobalState, Dispatch } from "./types";
import { getKeys, setObj, subCribe, middleDistpach, returnStateForSubscribe } from "./functionalities";
import { global } from "./constants"

declare global {
    var instance: Initialize;
}

export function useInitialize(
    reducer?: Reducer,
    initialState?: AnyObject
): Initialize {
    return Initialize.Instance(reducer, initialState);
}

export class Initialize {
    private _reducer: Reducer;
    private _globalState: GlobalState;
    //private static instance: Initialize;

    public static Instance(
        reducer?: Reducer,
        initialState?: AnyObject
    ): Initialize {
        if (!global.instance) {
            if (!reducer || !initialState) {
                throw new Error(
                    `${!reducer && "the reducer parameter is required for instance Initialize."}${!initialState && "\nthe initialState parameter is required for instance Initialize."}`
                );
            }

            global.instance = new Initialize(reducer, initialState);
        }

        return global.instance;
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


/********************
 *
 *  useSubcribeState
 *
********************/
/*
type ObjReducer = {
    value: number;
};

export default function useSubcribeState(
    props: string[],
    postDispatch?: (
        action: Action,
        state: object,
        dispatch: (action: Action) => void
    ) => void
): [GlobalState, Dispatch] {
    const initialized: Initialize = useInitialize();
    //Solo hace que el useReducer renderize el componente
    function reducer(state: ObjReducer, action: Action): any {
        let num;

        do {
            num = Math.floor(Math.random() * 1001);
        } while (num === state.value);

        return { value: num };
    }

    const [state, dispatch] = useReducer(reducer, { value: 0 });

    //Get component name/ don't touch it!
    const callerFunction: string =
        new Error().stack?.split("\n")[2].trim().split(" ")[1] ??
        "crypto.randomUUID";

    function callDispatch(action: Action) {
        dispatch(action);
    }

    //subscribe the component
    subCribe(props, callerFunction, callDispatch);

    //Check if a dispatch is added to execute before the execution continues.
    function outDispatch(action: Action) {
        if (postDispatch) {
            postDispatch(
                action,
                initialized.clone().globalState,
                (_action: Action) => {
                    middleDistpach(_action, initialized.reducer);
                }
            );
        } else {
            middleDistpach(action, initialized.reducer);
        }
    }

    const returnedState: GlobalState = returnStateForSubscribe(
        initialized.clone().globalState,
        callerFunction
    );

    return [returnedState, outDispatch];
}

export function dispatch(action: Action) {
    const initialized: Initialize = useInitialize();
    middleDistpach(action, initialized.reducer);
}
*/ 

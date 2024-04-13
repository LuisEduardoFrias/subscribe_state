/** @format */

import { useReducer } from "react";
import { Action, GlobalState, Dispatch } from "./types";
import {
    subCribe,
    middleDistpach,
    returnStateForSubscribe
} from "./functionalities";

import { Initialize } from "./initialize_super_state";

type ObjReducer = {
    value: number;
};

export default function useSuperState(
    props: string[] = [],
    postDispatch?: (
        action: Action,
        state: object,
        dispatch: (action: Action) => void
    ) => void
): [GlobalState, Dispatch] {
    const initialized: Initialize = Initialize.getInstance();
    
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

    return [returnStateForSubscribe(initialized.clone().globalState, callerFunction), outDispatch];
}

export function dispatch(action: Action) {
    middleDistpach(action, Initialize.getInstance().reducer);
}

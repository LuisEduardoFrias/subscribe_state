"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initialize = void 0;
const functionalities_1 = require("./functionalities");
// declare global {
//     var instance: Initialize;
// }
function useInitialize(reducer, initialState) {
    Initialize.getInstance(reducer, initialState);
}
exports.default = useInitialize;
class Initialize {
    static getInstance(reducer, initialState) {
        if (!Initialize._instance) {
            if (!reducer || !initialState)
                throw new Error(`${!reducer ? "The reducer parameter is required for instance Initialize." : ""}${!reducer && !initialState ? "\n" : ""}${!initialState ? "The initialState parameter is required for instance Initialize." : ""}`);
            Initialize._instance = new Initialize(reducer, initialState);
        }
        return Initialize._instance;
    }
    constructor(reducer, initialState) {
        this._reducer = reducer;
        this._globalState = initialState;
    }
    get globalState() {
        /*
        let aux = ({ name: "function name", value: this._globalState["function name"] });
        Reflect.deleteProperty(this._globalState, "function name");

        const clone: K = structuredClone(this._globalState);
        Reflect.set(clone, aux.name, aux.value)
        */
        return structuredClone(this._globalState);
    }
    get reducer() {
        return this._reducer;
    }
    updateGlobalState(newState, modifiedProperties) {
        if ((0, functionalities_1.getKeys)(this._globalState).length === 0) {
            (0, functionalities_1.getKeys)(newState).forEach((key) => (0, functionalities_1.setObj)(this._globalState, key, newState[key]));
        }
        else {
            modifiedProperties.forEach((key) => {
                (0, functionalities_1.setObj)(this._globalState, key, newState[key]);
            });
        }
    }
}
exports.Initialize = Initialize;

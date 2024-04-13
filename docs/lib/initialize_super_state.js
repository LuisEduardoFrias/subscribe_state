"use strict";
/** @format */
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initialize = void 0;
const functionalities_1 = require("./functionalities");
const constants_1 = require("./constants");
function useInitialize(reducer, initialState) {
    return Initialize.Instance(reducer, initialState);
}
exports.default = useInitialize;
class Initialize {
    static Instance(reducer, initialState) {
        if (!constants_1.GLOBAL.instance) {
            if (!reducer || !initialState) {
                throw Error(`${!reducer && "the reducer parameter is required for instance Initialize."}${!initialState && "\nthe initialState parameter is required for instance Initialize."}`);
            }
            constants_1.GLOBAL.instance = new Initialize(reducer, initialState);
        }
        return constants_1.GLOBAL.instance;
    }
    constructor(reducer, initialState) {
        this._reducer = reducer;
        this._globalState = initialState;
    }
    defaultReducer(state, action) {
        console.log("undefined reducer");
        return {};
    }
    clone() {
        const clonedInstance = Object.create(this);
        (0, functionalities_1.setObj)(clonedInstance, "reducer", this._reducer);
        (0, functionalities_1.setObj)(clonedInstance, "globalState", Object.assign({}, this._globalState));
        return clonedInstance;
    }
    get globalState() {
        return this._globalState;
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

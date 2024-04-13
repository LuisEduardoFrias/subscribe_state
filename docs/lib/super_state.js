"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = void 0;
const react_1 = require("react");
const functionalities_1 = require("./functionalities");
const initialize_super_state_1 = __importDefault(require("./initialize_super_state"));
function useSuperState(props, postDispatch) {
    var _a, _b;
    const initialized = (0, initialize_super_state_1.default)();
    //Solo hace que el useReducer renderize el componente
    function reducer(state, action) {
        let num;
        do {
            num = Math.floor(Math.random() * 1001);
        } while (num === state.value);
        return { value: num };
    }
    const [state, dispatch] = (0, react_1.useReducer)(reducer, { value: 0 });
    //Get component name/ don't touch it!
    const callerFunction = (_b = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split("\n")[2].trim().split(" ")[1]) !== null && _b !== void 0 ? _b : "crypto.randomUUID";
    function callDispatch(action) {
        dispatch(action);
    }
    //subscribe the component
    (0, functionalities_1.subCribe)(props, callerFunction, callDispatch);
    //Check if a dispatch is added to execute before the execution continues.
    function outDispatch(action) {
        if (postDispatch) {
            postDispatch(action, initialized.clone().globalState, (_action) => {
                (0, functionalities_1.middleDistpach)(_action, initialized.reducer);
            });
        }
        else {
            (0, functionalities_1.middleDistpach)(action, initialized.reducer);
        }
    }
    const returnedState = (0, functionalities_1.returnStateForSubscribe)(initialized.clone().globalState, callerFunction);
    return [returnedState, outDispatch];
}
exports.default = useSuperState;
function dispatch(action) {
    const initialized = (0, initialize_super_state_1.default)();
    (0, functionalities_1.middleDistpach)(action, initialized.reducer);
}
exports.dispatch = dispatch;

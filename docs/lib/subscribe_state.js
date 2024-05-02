"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = void 0;
const react_1 = require("react");
const functionalities_1 = require("./functionalities");
const initialize_super_state_1 = require("./initialize_super_state");
function useSubscribeState(props = [], postDispatch) {
    var _a, _b;
    const initialized = initialize_super_state_1.Initialize.getInstance();
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
            postDispatch(action, initialized.globalState, (_action) => {
                (0, functionalities_1.middleDistpach)(_action, initialized.reducer);
            });
        }
        else {
            (0, functionalities_1.middleDistpach)(action, initialized.reducer);
        }
    }
    return [(0, functionalities_1.returnStateForSubscribe)(initialized.globalState, callerFunction), outDispatch];
}
exports.default = useSubscribeState;
function dispatch(action) {
    (0, functionalities_1.middleDistpach)(action, initialize_super_state_1.Initialize.getInstance().reducer);
}
exports.dispatch = dispatch;

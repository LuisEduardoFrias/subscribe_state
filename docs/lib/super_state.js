"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const constants_1 = require("./constants");
const functionalities_1 = require("./functionalities");
function useSuperState(props, postDispatch) {
    var _a, _b;
    //
    function middlereducer(state, action) {
        //se ejecuta cuando se requiere actializar el estado de determinado suscriptor
        if (action.type === constants_1.UPDATE_OBTION_ID) {
            return (0, functionalities_1.clone)({
                GLOBAL_STATE: constants_1.GLOBAL_STATE,
                __obtionId__: constants_1.GLOBAL_STATE.__obtionId__
                    ? constants_1.GLOBAL_STATE.__obtionId__ === 10
                        ? 0
                        : constants_1.GLOBAL_STATE.__obtionId__ + 1
                    : 0
            });
        }
        //TODO validar si eventual mente este reducer se ejecuta.
        //alert("TODO validar si eventual mente este reducer se ejecuta.");
        //return OUT_REDUCER.fn(state, action);
        return {};
    }
    const [state, dispatch] = (0, react_1.useReducer)(middlereducer, constants_1.GLOBAL_STATE);
    //Get component name
    const callerFunction = (_b = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split("\n")[2].trim().split(" ")[1]) !== null && _b !== void 0 ? _b : "crypto.randomUUID";
    //subscribe the component
    (0, functionalities_1.subCribe)(props, callerFunction, dispatch);
    //Check if a dispatch is added to execute before the execution continues.
    function outDispatch(action) {
        if (postDispatch) {
            postDispatch(action, constants_1.GLOBAL_STATE, (_action) => {
                (0, functionalities_1.middleDistpach)(_action, constants_1.OUT_REDUCER.fn);
            });
        }
        else {
            (0, functionalities_1.middleDistpach)(action, constants_1.OUT_REDUCER.fn);
        }
    }
    const returnedState = (0, functionalities_1.returnStateForSubscribe)(constants_1.GLOBAL_STATE, callerFunction);
    return [returnedState, outDispatch];
}
exports.default = useSuperState;

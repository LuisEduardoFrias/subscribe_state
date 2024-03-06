"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const functionalities_1 = require("./functionalities");
const constants_1 = require("./constants");
function initializeSuperState(reducer, initalState) {
    (0, functionalities_1.setObj)(constants_1.OUT_REDUCER, "fn", reducer);
    //Initialize the global state
    if ((0, functionalities_1.getKeys)(constants_1.GLOBAL_STATE).length === 0) {
        (0, functionalities_1.getKeys)(initalState).forEach((e) => (0, functionalities_1.setObj)(constants_1.GLOBAL_STATE, e, initalState[e]));
    }
}
exports.default = initializeSuperState;

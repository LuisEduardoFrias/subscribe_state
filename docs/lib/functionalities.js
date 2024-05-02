"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnStateForSubscribe = exports.middleDistpach = exports.subCribe = exports.getKeys = exports.setObj = void 0;
const constants_1 = require("./constants");
const initialize_super_state_1 = require("./initialize_super_state");
//exact comparison of two objects
function equal(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
function setObj(obj, prop, value) {
    Reflect.set(obj, prop, value);
}
exports.setObj = setObj;
function getKeys(obj) {
    return Reflect.ownKeys(obj);
}
exports.getKeys = getKeys;
//subCribe the components
function subCribe(props, id, dispatch) {
    if (!constants_1.SUB_CRIBER[id]) {
        /*
        setObj(SUB_CRIBER, id, {
            props,
            dispatch
        });
        */
        constants_1.SUB_CRIBER[id] = {
            props,
            dispatch
        };
    }
}
exports.subCribe = subCribe;
//intermediator of the dispatch
function middleDistpach(action, reducer) {
    //
    const initialized = initialize_super_state_1.Initialize.getInstance();
    const newState = reducer(initialized.globalState, action);
    const changedProperties = getChangedProperties(initialized.globalState, newState);
    initialized.updateGlobalState(newState, changedProperties);
    //Probocar el cambio de estado en los useReducers de los suscriptores.
    if (changedProperties.length > 0)
        for (let key in constants_1.SUB_CRIBER) {
            const countPros = constants_1.SUB_CRIBER[key].props.length;
            for (let i = 0; i < countPros; i++) {
                const pr = constants_1.SUB_CRIBER[key].props[i];
                if (changedProperties.every(prop => prop === pr || prop === constants_1.ALL)) {
                    new Promise(resolve => {
                        constants_1.SUB_CRIBER[key].dispatch({ type: "any" });
                        resolve(null);
                    });
                    break;
                }
            }
        }
}
exports.middleDistpach = middleDistpach;
//retorna las propiedades que an sido actializadas.
function getChangedProperties(oldState, newState) {
    const changedProperties = [];
    for (const key in newState) {
        if (!equal(oldState[key], newState[key])) {
            changedProperties.push(key);
        }
    }
    return changedProperties;
}
//returns the state with the specific properties of a subscriber
function returnStateForSubscribe(state, callerFunction) {
    const newState = {};
    if (constants_1.SUB_CRIBER[callerFunction]) {
        const pros = constants_1.SUB_CRIBER[callerFunction].props;
        for (let i = 0; i < pros.length; i++) {
            if (pros[i] === constants_1.ALL)
                return state;
            setObj(newState, pros[i], state[pros[i]]);
        }
    }
    return newState;
}
exports.returnStateForSubscribe = returnStateForSubscribe;

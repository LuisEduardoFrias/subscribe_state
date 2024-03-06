"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnStateForSubscribe = exports.middleDistpach = exports.mapper = exports.clone = exports.subCribe = exports.getKeys = exports.setObj = void 0;
const constants_1 = require("./constants");
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
    if (typeof id === "string" && !constants_1.SUB_CRIBER[id]) {
        setObj(constants_1.SUB_CRIBER, id, {
            props,
            wasCalled: false,
            disp: dispatch
        });
    }
}
exports.subCribe = subCribe;
//clone object
function clone(obj) {
    const clonedObj = Object.assign({}, JSON.parse(JSON.stringify(obj)));
    addMethods(clonedObj, obj);
    return clonedObj;
}
exports.clone = clone;
function addMethods(clonedObj, originalObj) {
    for (let prop in originalObj) {
        if (Array.isArray(originalObj[prop])) {
            clonedObj[prop] = originalObj[prop].slice();
        }
        else if (typeof originalObj[prop] === "object" &&
            typeof originalObj[prop] !== "function" &&
            originalObj[prop] !== null) {
            clonedObj[prop] = {};
            addMethods(clonedObj[prop], originalObj[prop]);
        }
        else if (typeof originalObj[prop] === "function" &&
            prop !== "constructor") {
            clonedObj[prop] = originalObj[prop].bind(clonedObj);
        }
        else {
            clonedObj[prop] = originalObj[prop];
        }
    }
    const prototype = Object.getPrototypeOf(originalObj);
    if (prototype !== null) {
        const prototypeMethods = Object.getOwnPropertyNames(prototype);
        prototypeMethods.forEach(prop => {
            if (typeof prototype[prop] === "function" && prop !== "constructor") {
                clonedObj[prop] = prototype[prop].bind(clonedObj);
            }
        });
    }
}
//mapper an object
function mapper(obj, obj2) {
    getKeys(obj2).forEach((key) => {
        obj[key] = obj2[key];
    });
}
exports.mapper = mapper;
//intermediator of the dispatch
function middleDistpach(action, reducer) {
    //
    const methods2 = Object.getOwnPropertyNames(constants_1.GLOBAL_STATE.person);
    const methodsH2 = Object.getOwnPropertyNames(Object.getPrototypeOf(constants_1.GLOBAL_STATE.person));
    const allMethods2 = methods2.concat(methodsH2);
    const newState = reducer(clone(constants_1.GLOBAL_STATE), action);
    const changedProperties = getChangedProperties(constants_1.GLOBAL_STATE, newState);
    updateGlobalState(newState, changedProperties);
    changedProperties.forEach((p) => {
        for (let key in constants_1.SUB_CRIBER) {
            constants_1.SUB_CRIBER[key].props.forEach((pr) => {
                if ((p === pr || pr === constants_1.ALL) && constants_1.SUB_CRIBER[key].wasCalled === false) {
                    constants_1.SUB_CRIBER[key].disp({ type: constants_1.UPDATE_OBTION_ID });
                    constants_1.SUB_CRIBER[key].wasCalled = true;
                }
            });
        }
    });
    for (let key in constants_1.SUB_CRIBER) {
        constants_1.SUB_CRIBER[key].wasCalled = false;
    }
}
exports.middleDistpach = middleDistpach;
//retorna las propiedades que an sido actializadas.
function getChangedProperties(oldState, newState) {
    const changedProperties = [];
    for (const key in newState) {
        if (!equal(oldState[key], newState[key]))
            changedProperties.push(key);
    }
    return changedProperties;
}
//update the global state
function updateGlobalState(newState, modifiedProperties) {
    if (getKeys(constants_1.GLOBAL_STATE).length === 0) {
        getKeys(newState).forEach((key) => setObj(constants_1.GLOBAL_STATE, key, newState[key]));
    }
    else {
        modifiedProperties.forEach((key) => {
            setObj(constants_1.GLOBAL_STATE, key, newState[key]);
        });
    }
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

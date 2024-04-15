"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const react_1 = require("@testing-library/react");
const initialize_super_state_1 = __importStar(require("../lib/initialize_super_state"));
const super_state_1 = __importDefault(require("../lib/super_state"));
const reducer = (state, action) => {
    var _a;
    const actions = {
        changeName: () => {
            return Object.assign(Object.assign({}, state), { name: action.name });
        },
        changeLastName: () => {
            return Object.assign(Object.assign({}, state), { lastName: action.lastName });
        },
        changeAge: () => {
            return Object.assign(Object.assign({}, state), { age: action.age });
        },
        default: () => {
            throw new Error(`La accion ${action.type} no es valida.`);
        }
    };
    return ((_a = actions[action.type]) !== null && _a !== void 0 ? _a : actions["dafault"])();
};
const myInfo = {
    name: "luis",
    lastName: "frias",
    age: 29
};
(0, vitest_1.describe)('all_test', () => {
    (0, vitest_1.it)('Lanza error al no pasar los parametros requeridos.', () => {
        (0, vitest_1.expect)(() => (0, initialize_super_state_1.default)()).toThrowError('The reducer parameter is required for instance Initialize.\nThe initialState parameter is required for instance Initialize.');
        (0, vitest_1.expect)(() => (0, initialize_super_state_1.default)(reducer)).toThrowError('The initialState parameter is required for instance Initialize.');
    });
    (0, vitest_1.it)('Retorna una instancia de Initialize', () => {
        (0, initialize_super_state_1.default)(reducer, myInfo);
        (0, vitest_1.expect)(initialize_super_state_1.Initialize.getInstance()).toBeInstanceOf(initialize_super_state_1.Initialize);
    });
    (0, vitest_1.it)('Verificar que se inivializo el estado global', () => {
        const initialized = initialize_super_state_1.Initialize.getInstance();
        (0, vitest_1.expect)(initialized.clone().globalState).toBe(myInfo);
    });
    (0, vitest_1.it)('El primer valor de la tupla es un object.', () => {
        const { result } = (0, react_1.renderHook)(() => (0, super_state_1.default)([]));
        (0, vitest_1.expect)(result.current[0]).toBeTypeOf("object");
    });
    (0, vitest_1.it)('El segundo valor de la tupla es una funcion', () => {
        const { result } = (0, react_1.renderHook)(() => (0, super_state_1.default)([]));
        (0, vitest_1.expect)(result.current[1]).toBeTypeOf("function");
    });
    (0, vitest_1.it)('El objecto retornado debe ser igual a {}.', () => {
        const { result } = (0, react_1.renderHook)(() => (0, super_state_1.default)([]));
        (0, vitest_1.expect)(result.current[0]).toStrictEqual({});
    });
    (0, vitest_1.it)('El objecto retornado debe ser igual a  myInfo.', () => {
        const { result } = (0, react_1.renderHook)(() => (0, super_state_1.default)(["all"]));
        (0, vitest_1.expect)(result.current[0]).toEqual(myInfo);
    });
    (0, vitest_1.it)('Cambia el valor de la propiedad \'name\' por \'jose\'', () => {
        const { result } = (0, react_1.renderHook)(() => (0, super_state_1.default)(["name"]));
        (0, react_1.act)(() => result.current[1]({ type: "changeName", name: "jose" }));
        (0, vitest_1.expect)(result.current[0].name).toBe("jose");
    });
    (0, vitest_1.it)('La propiedad age no debe existir', () => {
        const { result } = (0, react_1.renderHook)(() => (0, super_state_1.default)(["name"]));
        (0, vitest_1.expect)(result.current[0].age).toBeUndefined();
    });
});

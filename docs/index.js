"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapper = exports.clone = exports.useSuperState = void 0;
const super_state_1 = __importDefault(require("./lib/super_state"));
exports.useSuperState = super_state_1.default;
const functionalities_1 = require("./lib/functionalities");
Object.defineProperty(exports, "clone", { enumerable: true, get: function () { return functionalities_1.clone; } });
Object.defineProperty(exports, "mapper", { enumerable: true, get: function () { return functionalities_1.mapper; } });
const initialize_super_state_1 = __importDefault(require("./lib/initialize_super_state"));
exports.default = initialize_super_state_1.default;

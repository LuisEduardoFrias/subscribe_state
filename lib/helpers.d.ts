import { Action, Update, UpdateState } from './types.js';
export declare function useActions<T extends {
    [key in keyof T]: Action;
}>(actions: string | string[]): T;
export declare function update<T extends object>(updateState: UpdateState): void;
export declare function createWarehouse<T extends object, K extends {
    [key in keyof K]: Action;
}>(createInitialState: (update: Update) => T & K): void;

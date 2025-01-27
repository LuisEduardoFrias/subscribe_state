import { Action, Subscribers, Subscriber } from './types.js';
export declare class Warehouse<T extends object, K extends {
    [key in keyof K]: Action;
}> {
    private _globalState;
    private _Actions;
    private _subscriber;
    private static _instance;
    static getInstance<J extends object, I extends {
        [key in keyof I]: Action;
    }>(initialState?: J & I): Warehouse<J, I>;
    private constructor();
    get globalState(): T;
    get actions(): {
        [key in keyof K]: Action;
    };
    get subscriber(): Subscribers;
    setSubscriber(subscriber: Subscriber, componentName: string): void;
    private splitState;
    getGlobalStateBySubscriber(componentName: string): Partial<T>;
    updateGlobalState(newState: T, modifiedProperties: (keyof T)[]): void;
}

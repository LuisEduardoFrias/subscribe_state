import { Action, Prop } from './types.js';
export declare function useSubscriberState<T extends object, K extends {
    [key in keyof K]: Action;
}>(props: Prop, notNotify?: boolean): [Partial<T>, {
    [key in keyof K]: Action;
}];

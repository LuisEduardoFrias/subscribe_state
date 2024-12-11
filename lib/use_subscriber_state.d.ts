import { Action, Props } from './types';
export default function useSubscriberState<T extends object, K extends {
    [key in keyof K]: Action;
}>(props: Props, notNotify?: boolean): [T, {
    [key in keyof K]: Action;
}];

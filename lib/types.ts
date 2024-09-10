//import type Initialize from './initialize_super_state.js';

export type AnySubCriber = {
  [key: string]: SubCriber;
};

export type SubCriber = {
  props: string[];
  dispatch: Dispatch;
};

export type OutReducer = {
  fn: Reducer;
};

export type Dispatch = (action: Action) => void;

export type Action = {
  type: any;
  [key: string]: any;
};

export type GlobalState = {
  [key: string]: any;
};

export type Reducer = <T>(state: T, actions: any) => T;

export type AnyObject = {
  [key: string]: any;
};

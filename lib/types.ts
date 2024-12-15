
export const ALL = 'all';

type _object = { [key: string | number | symbol]: any };

export type Action = (value: string | number | boolean | _object | Array<any>) => void;

export type Subscribers = { [key: string]: Subscriber };

export type Subscriber = {
  props: string[],
  dispatch: () => void,
  notNotify: boolean
};

export type Prop = string | string[];

export type UpdateState = <T>(state: T) => T;

export type Update = (updateState: UpdateState) => void;
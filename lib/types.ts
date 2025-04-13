
export const ALL = 'all';

//export type Action = (arg: object | string | number | boolean | symbol) => void;

export type Subscribers = { [key: string]: Subscriber };

export type Subscriber = {
	props: string[],
	dispatch: () => void,
	notNotify: boolean
};

export type Prop = string | string[];

export type UpdateState = <T>(state: T) => T;

export type Update = (updateState: UpdateState) => void;
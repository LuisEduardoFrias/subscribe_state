/** @format */

export type Action = {
	type: any;
	[key: string]: any;
};

export type SubCriber = {
	props: string[];
	wasCalled: boolean;
	disp: (action: Action) => void;
};

export type Reducer = (state: object, action: Action) => object;

export type OutReducer = {
	fn: Reducer;
};

export type GlobalState = {
	__obtionId__: number;
	[key: string]: any;
};

export type AnyObject = {
	[key: string]: any;
};

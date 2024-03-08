/** @format */


export type AnySubCriber = {
	[key: string]: SubCriber;
};

export type SubCriber = {
	props: string[];
	wasCalled: boolean;
	dispatch: (action: Action) => void;
};

export type Action = {
	type: any;
	[key: string]: any;
};

export type OutReducer = {
	fn: Reducer;
};

export type GlobalState = {
	__obtionId__: number;
	[key: string]: any;
};

export type Dispatch = (action: Action) => void;

export type Reducer = (state: object, action: Action) => GlobalState;

export type AnyObject = {
	[key: string]: any;
};

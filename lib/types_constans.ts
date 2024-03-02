/** @format */

//Types
type Action = {
	type: any;
	[key: string]: any;
};

type SubCriber = {
	props: string[];
	wasCalled: boolean;
	disp: (action: Action) => object;
};

type Reducer = (state: object, action: Action) => object;

//Constans
export const ALL: string = "all";
export const UPDATE_OBTION_ID: string = "__update_obtion_id__";
export const SUB_CRIBER: SubCriber = {};
export const GLOBAL_STATE: object = {};
export let OutReducer: object = {};

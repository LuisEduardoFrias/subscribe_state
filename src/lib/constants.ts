/** @format */

import { AnyObject, GlobalState, OutReducer, Action } from "./types";

export const ALL: string = "all";

export const UPDATE_OBTION_ID: string = "__update_obtion_id__";

export const SUB_CRIBER: AnyObject = {};

export const GLOBAL_STATE: GlobalState = { __obtionId__: 0 };

export const OUT_REDUCER: OutReducer = {
	fn: (state: object, action: Action) => Object
};

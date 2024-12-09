
export type UpdateState = <T>(state: T) => T;

export type UpdateGlobalState = (updateState: UpdateState) => void;

export type SetInitialState = <T>(update: UpdateGlobalState) => T;
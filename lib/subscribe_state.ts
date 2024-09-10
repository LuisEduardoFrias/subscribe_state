import { useReducer, useEffect } from 'react';
import { Action, Dispatch } from './types.js';
import {
  subCribe,
  middleDistpach,
  returnStateForSubscribe,
} from './functionalities.js';
import { Initialize } from './initialize_super_state.js';

type ObjReducer = {
  value: number;
};

export default function useSubscribeState<T>(
  props: string[] = [],
  postDispatch?: (
    action: Action,
    state: T,
    dispatch: (action: Action) => void
  ) => void
): [T, Dispatch] {
  const initialized = Initialize.getInstance<T>();

  //reducer
  function reducer(state: ObjReducer, _:Action): any {
    return { value: state.value === 0 ? 1 : 0 };
  }

  const [_, dispatch] = useReducer(reducer, { value: 0 });

  //Get component name/ don't touch it!
  const callerFunction: string =
    new Error().stack?.split('\n')[2].trim().split(' ')[1] ??
    'crypto.randomUUID';

  useEffect(() => {
    //subscribe the component
  }, [props, callerFunction, dispatch]);

  subCribe(props, callerFunction, (action: Action) => {
    dispatch(action);
  });

  //Check if a dispatch is added to execute before the execution continues.
  function outDispatch(action: Action) {
    if (postDispatch) {
      postDispatch(action, initialized.globalState, (_action: Action) => {
        middleDistpach(_action, initialized.reducer);
      });
    } else {
      middleDistpach(action, initialized.reducer);
    }
  }

  return [
    returnStateForSubscribe<T>(initialized.globalState, callerFunction),
    outDispatch,
  ];
}

export function dispatch(action: Action) {
  middleDistpach(action, Initialize.getInstance().reducer);
}

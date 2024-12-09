
//import { useRef } from 'react'

type functSetterType = <T>(state: T) => T;

export type setterType = (fn: functSetterType) => void;

type getInitialState = <T>(update: setterType) => T;

export default function creteSubscriber<T>(fn: getInitialState) {
  type reference = { state: T };

  const refState = { current: { state: null } };

  const _update = (_fn: functSetterType) => {
    const newState = _fn<T>(refState.current.state!);

    refState.current = { state: newState };
    console.log(newState)
  }

  refState.current = { state: fn<T>(_update) as T };


  const functions: { [key: string]: Function } = {};

  for (const key in refState.current?.state!) {
    if (typeof refState.current.state![key] === 'function') {
      functions[key] = refState.current.state![key] as Function;
    }
  }

  return (ar: string[]) => {
    return {
      state: ar.filter((key: string) => refState.current.state![key]),
      actions: functions
    }
  };
}
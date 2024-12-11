import { useReducer, useCallback } from 'react'
import { Action, Prop } from './types.js'
import { Warehouse } from './warehouse.js'

const reducer = (state: boolean, _: any): boolean => !state;

export function useSubscriberState<T extends object, K extends { [key in keyof K]: Action }>(
  props: Prop,
  notNotify: boolean = false
): [T, { [key in keyof K]: Action }] {

  const warehouse = Warehouse.getInstance<T, K>();

  const [_, dispatch] = useReducer(reducer, false);

  //Get component name/ don't touch it!
  const componentName: string =
    new Error().stack?.split('\n')[2].trim().split(' ')[1] ??
    'crypto.randomUUID';

  const _addSubscriber = useCallback(() => {
    warehouse.setSubscriber(
      {
        props: Array.isArray(props) ? props : [props],
        dispatch: () => dispatch({}),
        notNotify
      }, componentName);
  }, [props, componentName, dispatch])

  _addSubscriber();

  return [
    warehouse.getGlobalStateBySubscriber(componentName),
    warehouse.actions,
  ];
}
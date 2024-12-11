import { useReducer, useCallback } from 'react'
import { Action, Props } from './types'
import { addSubscriber } from './helpers'
import { Warehouse } from './warehouse'

const reducer = <T>(state: T, _: any): boolean => !state;

export default function useSubscriberState<T extends object, K extends { [key in keyof K]: Action }>(
  props: Props,
  notNotify: boolean = false
): [T, { [key in keyof K]: Action }] {

  const warehouse = Warehouse.getInstance<T, K>();

  const [_, dispatch] = useReducer<T>(reducer, false);

  //Get component name/ don't touch it!
  const componentName: string =
    new Error().stack?.split('\n')[2].trim().split(' ')[1] ??
    'crypto.randomUUID';

  const _addSubscriber = useCallback(() => {
    initialized.setSubscriber(
      { 
        props: Array.isArray(props) ? props : [props], 
        dispatch: () => dispatch({}),
        notNotify
        }, componentName);
  }, [props, componentName, dispatch])

  _addSubscriber();

  return [
    initialized.getGlobalStateBySubscriber(componentName),
    initialized.actions,
  ];
}
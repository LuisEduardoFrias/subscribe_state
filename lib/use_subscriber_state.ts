import { useReducer, useMemo, useCallback } from 'react'
import { Action, Prop } from './types.js'
import { Warehouse } from './warehouse.js'
import { v4 as uuidv4 } from 'uuid';

const reducer = (state: boolean) => !state;

export function useSubscriberState<T extends object, K extends { [key in keyof K]: Action }>(
  props: Prop,
  notNotify: boolean = false,
  uuid: string,
): [Partial<T>, { [key in keyof K]: Action }] {

  const warehouse = Warehouse.getInstance<T, K>();

  // Get component name 

  /*
  let uuid = '';

  if (typeof crypto === 'undefined' || crypto.randomUUID === undefined) {
    const cryptoRandomUUID = require('crypto-random-uuid');
    uuid = cryptoRandomUUID();
  } else {
    uuid = crypto.randomUUID();
  }
  */

  const componentName = useMemo(() => {
    return `${new Error().stack
      ?.split('\n')[2]
      .trim().split(' ')[1]}-${uuid ?? uuidv4()}`
  }, [uuid]);

  const [_, forceUpdate] = useReducer(reducer, false);

  const subscriber = useCallback(() => {
    warehouse.setSubscriber(
      {
        props: Array.isArray(props) ? props : [props],
        dispatch: forceUpdate,
        notNotify
      },
      componentName
    );
  }, [props])

  subscriber();

  return [
    warehouse.getGlobalStateBySubscriber(componentName),
    warehouse.actions,
  ];
}

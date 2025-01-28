import { useReducer, useEffect } from 'react'
import { Action, Prop } from './types.js'
import { Warehouse } from './warehouse.js'

const reducer = (state:boolean) => !state; 

export function useSubscriberState<T extends object, K extends { [key in keyof K]: Action }>(
  props: Prop,
  notNotify: boolean = false
): [Partial<T>, { [key in keyof K]: Action }] {

  const warehouse = Warehouse.getInstance<T, K>();
  // Get component name 
  const componentName = new Error().stack?.split('\n')[2].trim().split(' ')[1] ?? crypto.randomUUID();

  const [_, forceUpdate] = useReducer(reducer, false);

  useEffect(() => {
    // Cleanup: Remove subscriber on unmount
    return () => {
      delete warehouse.subscriber[componentName];
    };
  }, []);

  warehouse.setSubscriber(
    {
      props: Array.isArray(props) ? props : [props],
      dispatch: forceUpdate,
      notNotify,
    },
    componentName
  );

  return [
    warehouse.getGlobalStateBySubscriber(componentName),
    warehouse.actions,
  ];
}

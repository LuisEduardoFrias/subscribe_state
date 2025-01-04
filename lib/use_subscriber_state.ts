import { useReducer, useEffect } from 'react'
import { Action, Prop } from './types.js'
import { Warehouse } from './warehouse.js'

const reducer = () => true; // Simplified reducer

export function useSubscriberState<T extends object, K extends { [key in keyof K]: Action }>(
	props: Prop,
	notNotify: boolean = false
): [Partial<T>, { [key in keyof K]: Action }] {

	const warehouse = Warehouse.getInstance<T, K>();

	const [_, forceUpdate] = useReducer(reducer, false);

	// Get component name 
	const componentName = new Error().stack?.split('\n')[2].trim().split(' ')[1] ?? 'crypto.randomUUID()';

	useEffect(() => {
		warehouse.setSubscriber(
			{
				props: Array.isArray(props) ? props : [props],
				dispatch: forceUpdate,
				notNotify,
			},
			componentName
		);

		// Cleanup: Remove subscriber on unmount
		return () => {
			delete warehouse.subscriber[componentName];
		};
	}, [warehouse, props, notNotify, componentName, forceUpdate]);

	return [
		warehouse.getGlobalStateBySubscriber(componentName),
		warehouse.actions,
	];
}

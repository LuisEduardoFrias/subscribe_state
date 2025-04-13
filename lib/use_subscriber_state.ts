import { useReducer, useMemo, useCallback } from 'react'
import { Prop } from './types.js'
import { Warehouse } from './warehouse.js'
import { v4 as uuidv4 } from 'uuid';

const reducer = (state: boolean) => !state;

export function useSubscriberState<T extends object, K>(
	props: Prop,
	notNotify: boolean = false,
	uuid?: string,
): [T,  K] {

	const warehouse = Warehouse.getInstance<T, K>();

	// Get component name 
	//crypto-ramdom-uuid
	if (!uuid) {
		uuid = crypto.randomUUID();
	}

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
	}, [props, warehouse, notNotify, componentName])

	subscriber();

	return [
		warehouse.getGlobalStateBySubscriber(componentName),
		warehouse.actions,
	];
}

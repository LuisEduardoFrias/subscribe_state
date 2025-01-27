import { useReducer, useEffect } from 'react';
import { Warehouse } from './warehouse.js';
const reducer = (state) => !state; // Simplified reducer
export function useSubscriberState(props, notNotify = false) {
    var _a, _b;
    const warehouse = Warehouse.getInstance();
    // Get component name 
    const componentName = (_b = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split('\n')[2].trim().split(' ')[1]) !== null && _b !== void 0 ? _b : crypto.randomUUID();
    const [_, forceUpdate] = useReducer(reducer, false);
    useEffect(() => {
        // Cleanup: Remove subscriber on unmount
        return () => {
            delete warehouse.subscriber[componentName];
        };
    }, []);
    warehouse.setSubscriber({
        props: Array.isArray(props) ? props : [props],
        dispatch: forceUpdate,
        notNotify,
    }, componentName);
    return [
        warehouse.getGlobalStateBySubscriber(componentName),
        warehouse.actions,
    ];
}
//# sourceMappingURL=use_subscriber_state.js.map
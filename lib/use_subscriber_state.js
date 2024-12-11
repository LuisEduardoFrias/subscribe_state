import { useReducer, useCallback } from 'react';
import { Warehouse } from './warehouse';
const reducer = (state, _) => !state;
export default function useSubscriberState(props, notNotify = false) {
    var _a, _b;
    const warehouse = Warehouse.getInstance();
    const [_, dispatch] = useReducer(reducer, false);
    //Get component name/ don't touch it!
    const componentName = (_b = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split('\n')[2].trim().split(' ')[1]) !== null && _b !== void 0 ? _b : 'crypto.randomUUID';
    const _addSubscriber = useCallback(() => {
        initialized.setSubscriber({
            props: Array.isArray(props) ? props : [props],
            dispatch: () => dispatch({}),
            notNotify
        }, componentName);
    }, [props, componentName, dispatch]);
    _addSubscriber();
    return [
        initialized.getGlobalStateBySubscriber(componentName),
        initialized.actions,
    ];
}
//# sourceMappingURL=use_subscriber_state.js.map
import { ALL } from './constants.js';
import { Warehouse } from './warehouse.js';
export function useActions(actions) {
    const warehouse = Warehouse.getInstance();
    const _actions = Array.isArray(actions) ? actions : [actions];
    if (_actions[0] === ALL)
        return warehouse.actions;
    const functionsAction = {};
    for (const _action of _actions) {
        Reflect.set(functionsAction, _action, warehouse.actions[_action]);
    }
    return functionsAction;
}
export function update(updateState) {
    dispatch(updateState(Warehouse.globalState));
}
export function createWarehouse(createInitialState) {
    let warehouse;
    warehouse = Warehouse.getInstance(createInitialState(update));
}
function dispatch(newState) {
    const warehouse = Warehouse.getInstance();
    const changedProperties = getChangedProperties(newState, warehouse.globalState);
    if (changedProperties.length === 0)
        return;
    warehouse.updateGlobalState(newState, changedProperties);
    for (const subscriber in warehouse.subscriber) {
        for (const prop of subscriber.props) {
            if (hangedProperties.includes(prop) || prop === ALL) {
                const promesa = new Promise((resolve, _) => {
                    subscriber.dispatch();
                    resolve(true);
                });
                promesa.then((_) => { });
                break;
            }
        }
    }
}
function equal(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
function getChangedProperties(newState, oldState) {
    const changedProperties = [];
    for (const key of Object.keys(newState)) {
        if (!equal(oldState[key], newState[key])) {
            changedProperties.push(key);
        }
    }
    return changedProperties;
}
//# sourceMappingURL=helpers.js.map
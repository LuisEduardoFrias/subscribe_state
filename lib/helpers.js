import { ALL } from './types.js';
import { Warehouse } from './warehouse.js';
export function useActions(actions) {
    const warehouse = Warehouse.getInstance();
    if (!actions || actions === ALL)
        return warehouse.actions;
    const _actions = Array.isArray(actions) ? actions : [actions];
    const functionsAction = _actions.reduce((acc, action) => {
        acc[action] = warehouse.actions[action];
        return acc;
    }, {});
    return functionsAction;
}
export function update(updateState) {
    const warehouse = Warehouse.getInstance();
    dispatch(updateState(structuredClone(warehouse.globalState)));
}
export function createWarehouse(createInitialState) {
    const isFunttion = typeof createInitialState === 'function';
    Warehouse.getInstance(isFunttion ? createInitialState(update) : createInitialState);
}
function dispatch(newState) {
    const warehouse = Warehouse.getInstance();
    const changedProperties = getChangedProperties(newState, warehouse.globalState);
    if (changedProperties.length === 0) {
        return;
    }
    warehouse.updateGlobalState(newState, changedProperties);
    for (const subscriber of Object.values(warehouse.subscriber)) {
        if (subscriber.props.includes(ALL) || subscriber.props.some((prop) => changedProperties.includes(prop))) {
            subscriber.dispatch();
        }
    }
}
function equal(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
function getChangedProperties(newState, oldState) {
    return Object.keys(newState)
        .filter((key) => !equal(oldState[key], newState[key]));
}
//# sourceMappingURL=helpers.js.map
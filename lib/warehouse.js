import { ALL } from './types.js';
export class Warehouse {
    static getInstance(initialState) {
        if (!Warehouse._instance) {
            if (!initialState)
                throw new Error("You must provide a value for the 'initialState' argument.");
            Warehouse._instance = new Warehouse(initialState);
        }
        return Warehouse._instance;
    }
    constructor(initialState) {
        const [state, actions] = this.splitState(initialState);
        this._globalState = state;
        this._Actions = actions;
        this._subscriber = {};
    }
    get globalState() {
        return this._globalState;
    }
    get actions() {
        return this._Actions;
    }
    get subscriber() {
        return this._subscriber;
    }
    setSubscriber(subscriber, componentName) {
        this._subscriber[componentName] = subscriber;
    }
    splitState(initialState) {
        const state = {};
        const functions = {};
        for (const key in initialState) {
            if (typeof initialState[key] === 'function') {
                functions[key] = initialState[key];
            }
            else {
                state[key] = initialState[key];
            }
        }
        return [state, functions];
    }
    //returns the state with the specific properties of a subscriber
    getGlobalStateBySubscriber(componentName) {
        const subscriber = Reflect.get(this._subscriber, componentName);
        if (!subscriber)
            throw new Error(`The subscriber '${componentName}' not exists.`);
        if (subscriber.props.includes(ALL)) {
            return structuredClone(this.globalState);
        }
        const newState = {};
        for (const prop of subscriber.props) {
            newState[prop] = this.globalState[prop];
        }
        return structuredClone(newState);
    }
    updateGlobalState(newState, modifiedProperties) {
        for (const key of modifiedProperties) {
            this._globalState[key] = newState[key];
        }
    }
}
//# sourceMappingURL=warehouse.js.map
import { ALL } from './types';
export class Warehouse {
    static getInstance(initialState) {
        if (Initialize._instance) {
            if (!initialState)
                throw new Error("You must provide a value for the 'initialState' argument.");
            Initialize._instance = new Initialize(initialState);
        }
        return Initialize._instance;
    }
    constructor(initialState) {
        const [state, actions] = this.splitState(initialState);
        this._globalState = state;
        this._Actions = actions;
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
        Reflect.set(this._subscriber, componentName, subscriber);
    }
    splitState(initialState) {
        throw new ERROR('completa en splitState');
        return [{}, {}];
    }
    //returns the state with the specific properties of a subscriber
    getGlobalStateBySubscriber(componentName) {
        let newState = {};
        const subscriber = Reflect.get(this._subscriber, componentName);
        if (!subscriber)
            throw new Error(`The subscriber ${componentName} not exists.`);
        const props = subscriber.props;
        for (const prop of props) {
            if (prop === ALL) {
                return this.globalState;
                break;
            }
            Reflect.set(newState, prop, this.globalState[prop]);
        }
        return newState;
    }
    updateGlobalState(newState, modifiedProperties) {
        let key;
        for (key of modifiedProperties) {
            Reflext.set(this._globalState, key, newState[key]);
        }
    }
}
//# sourceMappingURL=warehouse.js.map
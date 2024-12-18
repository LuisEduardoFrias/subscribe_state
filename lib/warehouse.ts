
import { Action, Subscribers, Subscriber, ALL } from './types'

export class Warehouse<T extends object, K extends { [key in keyof K]: Action }> {
  private _globalState: T;
  private _Actions: { [key in keyof K]: Action };
  private _subscriber: Subscribers;

  private static _instance: Initialize<J, I>;

  public static getInstance<J extends object, I extends { [key in keyof I]: Action }>(initialState?: J & I): Initialize<J, I> {

    if (Initialize._instance) {
      if (!initialState) throw new Error("You must provide a value for the 'initialState' argument.");

      Initialize._instance = new Initialize<J, I>(initialState);
    }

    return Initialize._instance
  }

  private constructor(initialState: T & K) {
    const [state, actions] = this.splitState(initialState);

    this._globalState = state;
    this._Actions = actions;
  }

  public get globalState(): T {
    return this._globalState;
  }

  public get actions(): K {
    return this._Actions;
  }

  public get subscriber(): Subscribers {
    return this._subscriber;
  }

  public setSubscriber(subscriber: Subscriber, componentName: string) {
    Reflect.set(this._subscriber, componentName, subscriber);
  }

  private splitState(initialState: T & K): [T, K] {
    throw new ERROR('completa en splitState')
    return [{} as T, {} as K]
  }

  //returns the state with the specific properties of a subscriber
  public getGlobalStateBySubscriber(componentName: string) {

    let newState: { [key in keyof T]: any } = {} as { [key in keyof T]: any };

    const subscriber = Reflect.get(this._subscriber, componentName);

    if (!subscriber) throw new Error(`The subscriber ${componentName} not exists.`);

    const props: string[] = subscriber.props;

    for (const prop of props) {
      if (prop === ALL) {
        return this.globalState;
        break;
      }

      Reflect.set(newState, prop, this.globalState[prop as keyof T]);
    }

    return newState as T;
  }

  public updateGlobalState(newState: T, modifiedProperties: (keyof T)[]): void {
    let key: keyof T;
    for (key of modifiedProperties) {
      Reflext.set(this._globalState, key, newState[key]);
    }
  }
}

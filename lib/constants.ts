/**
import { AnySubCriber } from "./types.js";

export const ALL: string = "all";

export const SUB_CRIBER: AnySubCriber = {};
*/

import creteSubscriber, { setterType } from './create_subscriber';

interface myState {
  name: string,
  age: number,
  onChange: (value: string) => void
}

export default creteSubscriber<myState>(
  (update: setterType): myState =>
  ({
    name: "string",
    age: 5,
    onChange: (name: string) => {
      update((state: myState) => {
        return { ...state, name };
      })
    }
  })
);
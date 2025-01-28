
import { createWarehouse, update } from '../lib/' //'subscriber_state'

type State = {
  counter: number,
  text: string,
  darkMode: boolean
}

type Actions = {
  onIncrementCounter: () => void,
  onChangeText: (text: string) => void,
  onChangeDarkMode: (isDarkMode: boolean) => void
}

function onIncrementCounter() {
  update<State>((state: State): State => {
    return ({ ...state, counter: state.counter + 1 })
  })
};

function onChangeText(text: string) {
  update<State>((state: State): State => ({ ...state, text }))
};

function onChangeDarkMode(isDarkMode: boolean) {
  update<State>((state: State): State => ({ ...state, darkMode: isDarkMode }))
};

createWarehouse<State, Actions>({
  counter: 0,
  text: 'wold',
  darkMode: true,
  onIncrementCounter,
  onChangeText,
  onChangeDarkMode
});


import { createWarehouse, update } from '../lib/' //'subscriber_state'

type State = {
  counter: number,
  text: string,
  darkMode: boolean,
  select: string[]
}

type Actions = {
  onIncrementCounter: () => void,
  onChangeText: (text: string) => void,
  onChangeDarkMode: (isDarkMode: boolean) => void,
  onSelected: (key: string) => void,
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

function onSelected(key: string) {
  update<State>((state: State): State => {
    const select = state.select;
    
   const index = select.findIndex((_key:string)=> _key === key);

if(index !== -1){
  select.splice(index,1);
}else {
  select.push(key);
}

    return { ...state, select }
  })
};

createWarehouse<State, Actions>({
  counter: 0,
  text: 'wold',
  darkMode: true,
  select: [],
  onIncrementCounter,
  onChangeText,
  onChangeDarkMode,
  onSelected
});

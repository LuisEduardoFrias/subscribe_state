import { createWarehouse, update } from '../lib/'; //'subscriber_state'
function onIncrementCounter() {
    update((state) => {
        return ({ ...state, counter: state.counter + 1 });
    });
}
;
function onChangeText(text) {
    update((state) => ({ ...state, text }));
}
;
function onChangeDarkMode(isDarkMode) {
    update((state) => ({ ...state, darkMode: isDarkMode }));
}
;
createWarehouse({
    counter: 0,
    text: 'wold',
    darkMode: true,
    onIncrementCounter,
    onChangeText,
    onChangeDarkMode
});

import { createWarehouse, update } from 'subscribe_state';
function onIncrementCounter() {
    update((state) => {
        return (Object.assign(Object.assign({}, state), { counter: state.counter + 1 }));
    });
}
;
function onChangeText(text) {
    update((state) => (Object.assign(Object.assign({}, state), { text })));
}
;
function onChangeDarkMode(isDarkMode) {
    update((state) => (Object.assign(Object.assign({}, state), { darkMode: isDarkMode })));
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
//# sourceMappingURL=warehouse.js.map
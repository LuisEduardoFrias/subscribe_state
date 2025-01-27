import reactLogo from './assets/react.svg';
import ShowCounter from './show_counter';
import ThemeDark from './theme_dark';
import InsertText from './insert_text';
import ShowText from './show_text';
import './App.css';
import { useActions } from 'subscribe_state';
function App() {
    const { onIncrementCounter } = useActions(["onIncrementCounter"]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement("img", { src: reactLogo, className: "logo react", alt: "React logo" })),
        React.createElement("h1", null, "Subscribe state"),
        React.createElement("div", { className: "card" },
            React.createElement("button", { onClick: onIncrementCounter }, "count")),
        React.createElement(ShowCounter, null),
        React.createElement(ThemeDark, null),
        React.createElement(InsertText, null),
        React.createElement(ShowText, null)));
}
export default App;
//# sourceMappingURL=App.js.map
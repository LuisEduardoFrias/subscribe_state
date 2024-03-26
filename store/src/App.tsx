/** @format */

import useInitialize from "./super_state/index";
import initialState from "./helpers/initial_state";
import Reducer from "./helpers/reducer";
import Home from "./components/home";
import "./styles/global.css";

export default function App() {
    useInitialize(Reducer, initialState());
    return <Home />;
}

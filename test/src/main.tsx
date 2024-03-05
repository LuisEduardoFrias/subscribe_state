/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initialState from "./helpers/initial_state";
import Reducer from "./helpers/reducer.ts";
import initializeSuperState from "super_state";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);

function Main() {
	initializeSuperState(Reducer, initialState());
	return <App />;
}

/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initialState from "./helpers/initial_state";
import initializeSuperState from "../../index.ts";
import Reducer from "./helpers/reducer.ts";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);

function Main() {
	initializeSuperState(Reducer, initialState());
	return <App />;
}

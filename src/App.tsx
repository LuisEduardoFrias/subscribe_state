/** @format */

import React, { Suspense, lazy } from "react";
const ShowData = React.lazy(() => import("./components/show_data"));
const FormData = React.lazy(() => import("./components/form_data"));
const ThemeConfiguration = React.lazy(
	() => import("./components/theme_configuration")
);
import Component from "./components/components";
//
import initialState from "./helpers/initial_state";
import useSuperState from "./hook/use_super_state";
import Reducer from "./helpers/reducer";
import "./styles/app.css";
//
export default function App() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["taping"]);

	return (
		<>
			<h1>Test UseSuperState</h1>
			<div className='app_pronter'>
				<span className='app_taping'>Writing...</span>
			</div>
					<Component />
			<div className='app_components'>
				<Suspense fallback={<div>Loading...</div>}>
					<ShowData />
					<FormData />
					<ThemeConfiguration />
				</Suspense>
			</div>
		</>
	);
}

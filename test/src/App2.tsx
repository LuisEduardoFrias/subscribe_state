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
import useSuperState from "../../index.ts";
import Reducer from "./helpers/reducer";
import "./styles/app.css";
//
export default function App() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"fontFamily"
	]);

	console.log("App : \n_____________\n" + JSON.stringify(state, null, 2));

	const _styles: React.CSSProperty = {
		backgroundColor: `${state.appStyle.backgroundColor}`,
		color: `${state.appStyle.textColor}`,
		fontSize: `${state.appStyle.titleSize}px`,
		fontFamily: `${state.fontFamily}`
	};

	return (
		<div style={_styles}>
			<h1>Test UseSuperState</h1>
			<div className='app_pronter'>
				<span className='app_taping'>W</span>
			</div>
			<div className='app_components'>
				<Component />
				<Suspense fallback={<div>Loading...</div>}>
					<ShowData />
					<FormData />
					<ThemeConfiguration />
				</Suspense>
			</div>
		</div>
	);
}
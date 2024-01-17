/** @format */

import React, { Suspense, lazy } from "react";
const MoreConfiguration = React.lazy(() => import("./more_configuration"));

import initialState from "../helpers/initial_state";
import useSuperState from "../hook/use_super_state";
import Reducer, { actions } from "../helpers/reducer";
import "../styles/theme_configuration.css";
//
export default function ThemeConfiguration() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"fontFamily",
		"appStyle",
		"formStyle"
	]);

	function handleChange(evert: any) {
		const value = evert.target.value;
		const objectPro = evert.target.name.split("_");

		if (objectPro[0] === "appStyle") {
			dispatch({ type: actions.hdhd, value, prop: objectPro[1] });
		} else if (objectPro[0] === "formStyle") {
			dispatch({ type: actions.hdhd, value, prop: objectPro[1] });
		} else {
			dispatch({ type: actions.hdhd, value });
		}
	}

	return (
		<div className='component'>
			<span className='comp_name'>Theme Configuration</span>
			<div className='themeConf'>
				<div className='themeConf_container'>
					<span className='themeConf_title'>App</span>

					<fieldset>
						<label htmlFor='app_bc'>Background</label>
						<input
							type='color'
							name='appStyle_backgroundColor'
							id='app_bc'
							value={state.appStyle.backgroundColor}
							onChange={handleChange}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='app_text_color'>Text color</label>
						<input
							type='color'
							name='appStyle_textColor'
							id='app_text_color'
							value={state.appStyle.textColor}
							onChange={handleChange}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='app_title_size'>
							Title size {state.appStyle.titleSize}
						</label>
						<input
							type='range'
							name='appStyle_titleSize'
							id='app_title_size'
							min='8'
							max='18'
							value={state.appStyle.titleSize}
							onChange={handleChange}
						/>
					</fieldset>
				</div>
				<div className='themeConf_container'>
					<span className='themeConf_title'>Form Data</span>

					<fieldset>
						<label htmlFor='form_bc'>Background</label>
						<input
							type='color'
							name='formStyle_backgroundColo'
							id='form_bc'
							value={state.formStyle.backgroundColor}
							onChange={handleChange}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='form_text_color'>Text color</label>
						<input
							type='color'
							name='formStyle_textColor'
							id='form_text_color'
							value={state.formStyle.textColor}
							onChange={handleChange}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='form_title_size'>
							Title size {state.formStyle.titleSize}
						</label>
						<input
							type='range'
							name='formStyle_titleSize'
							id='form_title_size'
							min='8'
							max='18'
							value={state.formStyle.titleSize}
							onChange={handleChange}
						/>
					</fieldset>
				</div>
				<div className='themeConf_container'>
					<span className='themeConf_title'>Another</span>

					<fieldset>
						<label htmlFor='fontFamily'>Form family</label>

						<select
							name='fontFamily'
							id='fontFamily'
							value={state.fontFamily}
							onChange={handleChange}>
							<option value='Arial, sans-serif'>Arial</option>
							<option value="'Times New Roman', serif">Times New Roman</option>
							<option value="'Courier New', monospace">Courier New</option>
							<option value='Verdana, sans-serif'>Verdana</option>
						</select>
					</fieldset>
				</div>
			</div>
			<br />
			<MoreConfiguration />
		</div>
	);
}

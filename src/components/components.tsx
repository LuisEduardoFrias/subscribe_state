/** @format */
"use client";

import React, { Suspense, lazy } from "react";
const Component5 = React.lazy(() => import("./component5"));

import initialState from "../helpers/initial_state";
import useSuperState from "../hook/use_super_state";
import Reducer from "../helpers/reducer";

export default function Component() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"name",
		"age"
	]);

	console.log("cp 1 : " + JSON.stringify(state));

	return (
		<div
			style={{
				fontFamily: "inherit",
				width: "100%",
				padding: "10px",
				backgroundColor: "#373737",
				borderRadius: "10px",
				color: "white",
				border: "2px solid #6b6868de",
				boxSizing: "border-box",

				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				gap: "15px"
			}}>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						margin: "3px",
						gap: "5px"
					}}>
					<span>Componente 1 padre </span>
					<hr />
					<div>
						<span>Name: </span>
						<span>{state.name}</span>
					</div>
					<div>
						<span>Age: </span>
						<span>{state.age}</span>
					</div>
				</div>
				<button
					onClick={() => {
						dispatch({ type: "up_age", value: state.age + 1 });
					}}
					style={{ width: "100%" }}>
					Aumental la edad
				</button>
			</div>
			<Component2 />
			<Component3 />
			<Component4 />
		</div>
	);
}

const colors = ["yellow", "red", "blue", "green"];

//export const Component2 = React.memo(
function Component2() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), ["color"]);

	console.log("cp 2 : " + JSON.stringify(state));

	return (
		<div
			style={{
				fontFamily: "inherit",
				display: "flex",
				flexDirection: "column",
				width: "calc(100% - 15px)",
				boxSizen: "border-box",
				padding: "10px",
				gap: "15px",
				color: "white",
				border: "2px solid #0000d9",
				backgroundColor: "#000073"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Componente 2</span>
				<hr />
				<div>
					<span>Color: </span>
					<span>{state?.color}</span>
				</div>
				<button
					onClick={() => {
						let index = colors.indexOf(state.color);

						if (index === 3) {
							index = 0;
						} else {
							index++;
						}

						dispatch({ type: "change_color", value: colors[index] });
					}}
					style={{ width: "100%" }}>
					Cambiar color
				</button>
			</div>
		</div>
	);
}

export function Component3() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"volume",
		"age"
	]);

	console.log("cp 3 : " + JSON.stringify(state));

	return (
		<div
			style={{
				fontFamily: "inherit",
				display: "flex",
				flexDirection: "column",
				width: "calc(100% - 15px)",
				boxSizen: "border-box",
				padding: "10px",
				gap: "15px",
				color: "white",
				border: "2px solid #ddd400",
				backgroundColor: "#757000"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Componente 3</span>
				<hr />
				<button
					onClick={() => {
						dispatch({ type: "up_age", value: state.age - 1 });
					}}
					style={{ width: "100%" }}>
					Disminuir edad
				</button>
				<br />
				<input
					type='range'
					value={state.volume}
					onChange={event => {
						dispatch({ type: "change_volume", value: event.target.value });
					}}
				/>
				<br />
			</div>
		</div>
	);
}

//export const Component4 = React.memo(
function Component4() {
	const [state, dispatch] = useSuperState(Reducer, initialState(), [
		"color",
		"age"
	]);

	console.log("cp 4 : " + JSON.stringify(state));

	return (
		<div
			style={{
				fontFamily: "inherit",
				display: "flex",
				flexDirection: "column",
				width: "calc(100% - 15px)",
				boxSizen: "border-box",
				padding: "10px",
				gap: "15px",
				color: "white",
				border: "2px solid #00d500",
				backgroundColor: "#007700"
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					margin: "3px",
					gap: "5px"
				}}>
				<span>Componente 4</span>
				<hr />
				<div>
					<span>Color: </span>
					<span>{state?.color}</span>
				</div>
				<span
					style={{
						border: `1px solid ${state.color}`,
						width: "100%",
						height: "15px",
						backgroundColor: `${state.color}`
					}}></span>
				<div>
					<span>Age: </span>
					<span>{state?.age}</span>
				</div>

				<span>{state?.age >= 18 ? "Mayor de edad" : "Menor de edad"}</span>
				<hr />
				<Suspense fallback={<div>Loading...</div>}>
					<Component5 />
				</Suspense>
			</div>
		</div>
	);
}

/** @format */

import React, { useState, useEffect, ReactElement, ChangeEvent } from "react";

type RequireAlerts = {
	key: string;
	element: ReactElement;
};

interface IFormsProp<T> {
	onSubmit: (data: T[]) => void;
	children: ReactElement | ReactElement[];
	className?: string;
	dataFile?: boolean;
}

export default function Form<T>(props: IFormsProp<T>): ReactElement {

	const [state, setState] = useState<T[]>([]);
	const [childRequired, setChildRequired] = useState<RequireAlerts[]>([]);

	const formComponents = Array.isArray(props.children)
		? props.children
		: [props.children];

	const formComponentsWithOnChange = formComponents.map(
		(child: ReactElement, index: number) =>
			addOnChangeToFormComponents(child, index, setState, setChildRequired)
	);

	return (
		<form
			onSubmit={event => Submit(event, childRequired, state, props.onSubmit)}
			className={props.className}>
			{formComponentsWithOnChange}
		</form>
	);
}

async function Submit<T>(
	event: React.FormEvent<HTMLFormElement>,
	childRequired: RequireAlerts[],
	state: T[],
	onSubmit: (data: T[]) => boolean
) {
	event.preventDefault();

	let thereAreRequited: boolean = false;

	childRequired.forEach(e => {
		if (!state[e.key]) {
			changeVisivilityRequired(e.key, true);
			thereAreRequited = true;
		}
	});

	if (!thereAreRequited) {
		if (await onSubmit(state)) {
			clear();
		}
	} else {
	}
}

function changeVisivilityRequired(forValue: string, visible: boolean) {
	let span = document.querySelector("span[for='" + forValue + "']");

	if (span) span.style.display = visible ? "block" : "none";
}

function requiredAlertStyles(
	child: ReactElement,
	setChildRequired: (
		callback: (value: RequireAlerts[]) => requiredAlertStyles[]
	) => void
): ReactElement {
	if (child) {
		setChildRequired(prev => {
			if (prev !== undefined) return { key: child.props.for, element: child };
		});

		const newStyle = { ...child.props.style, color: "red", display: "none" };
		const newProps = { ...child.props, style: newStyle };
		const newChild = React.cloneElement(child, newProps);

		return newChild;
	}

	return child;
}

function clear() {
	const formElements = Array.from(
		document.querySelectorAll("input, select, textarea")
	) as HTMLElement[];

	formElements.forEach((element: HTMLElement) => {
		if ("type" in element && typeof element.type === "string") {
			const elementType = element.type.toLowerCase();
			switch (elementType) {
				case "text":
				case "password":
				case "email":
				case "number":
				case "search":
				case "tel":
				case "url":
				case "textarea":
					(element as HTMLInputElement | HTMLTextAreaElement).value = "";
					break;

				case "radio":
				case "checkbox":
					(element as HTMLInputElement).checked = false;
					break;

				case "select-one":
				case "select-multiple":
					(element as HTMLSelectElement).selectedIndex = -1;
					break;

				default:
					break;
			}
		}
	});
}

function getInputValue(
	event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
): string | number {
	const target = event.currentTarget as
		| HTMLInputElement
		| HTMLTextAreaElement
		| HTMLSelectElement;

	const { type, name, value } = target;

	if (type === "number") {
		return Number(value);
	}

	return value;
}

function handleChange(
	e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	setState: (callback: (value: object[]) => object[]) => void
): void {
	if (e.currentTarget instanceof HTMLInputElement) {
		changeVisivilityRequired(e.target.id);

		if (e.target.type === "file" && props.dataFile) {
			const file = e.target.files?.[0];
			const name = e.target?.name;

			if (file) {
				const reader = new FileReader();

				reader.onloadend = async () => {
					setState(prev => {
						return { ...prev, [name]: reader.result as string };
					});
				};

				reader.readAsDataURL(file);
			}
		} else {
			//alert("change: " + e.target.name)
			if (e.target?.name !== "") {
				const value = getInputValue(e);

				setState(prev => {
					return { ...prev, [e.target?.name]: value };
				});
			}
		}
	}
}

function handleChange2(
	e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	change: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => void,
	setState: (callback: (value: object[]) => object[]) => void
) {
	if (change) {
		Reflect.apply(change, null, [e]);
	}
	handleChange(e, setState);
}

function addOnChangeToFormComponents(
	child: ReactElement,
	index: number,
	setState: (callback: (value: object[]) => object[]) => void,
	setChildRequired: (
		callback: (value: RequireAlerts[]) => requiredAlertStyles[]
	) => void
): ReactElement {
	if (React.isValidElement(child)) {
		//React.isValidElement(child)
		let cloneChild: ReactElement = child;
		let change: (e: any) => void = null;

		if (cloneChild.props?.change) {
			change = cloneChild.props.change;
		}

		if (cloneChild.props?.required)
			cloneChild = requiredAlertStyles(cloneChild, setChildRequired);

		const { type } = cloneChild?.props ?? { type: null };

		if (
			cloneChild.type === "input" &&
			(type === "text" || type === "undefined") &&
			cloneChild.props.onChange === undefined
		) {
			return React.cloneElement(cloneChild, {
				onChange: (e: any) => handleChange2(e, change, setState),
				key: index
			});
		}

		if (type === "textarea" && cloneChild.props.onChange === undefined) {
			return React.cloneElement(cloneChild, {
				onChange: (e: any) => handleChange2(e, change, setState),
				key: index
			});
		}

		if (type === "select" && cloneChild.props.onChange === undefined) {
			return React.cloneElement(cloneChild, {
				onChange: (e: any) => handleChange2(e, change, setState),
				key: index
			});
		}

		const count = React.Children.count(cloneChild.props.children);

		if (count > 0) {
			const childrenWithOnChange = React.Children.map(
				cloneChild.props.children,
				(child: ReactElement, index: number) =>
					addOnChangeToFormComponents(child, index, setState, setChildRequired)
			);

			return React.cloneElement(cloneChild, {}, childrenWithOnChange);
		}

		if (cloneChild.props.onChange === undefined) {
			return React.cloneElement(cloneChild, {
				onChange: (e: any) => handleChange2(e, change, setState),
				key: index
			});
		}

		return cloneChild;
	}

	return child;
}

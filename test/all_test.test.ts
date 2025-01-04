import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react';
import { useActions, update, useSubscriberState, createWarehouse } from "../lib/index.ts"

type myState = {
	name: string,
	lastName: string,
	age: number,
}

type myActions = {
	changeName: (name: string) => void,
	changeLastName: (lastName: string) => void,
	changeAge: (age: number) => void
}

function changeName(name: string) {
	update(<myState>(state: myState): myState => ({ ...state, name }));
};

function changeLastName(lastName: string) {
	update(<myState>(state: myState): myState => ({ ...state, lastName }));
};

function changeAge(age: number) {
	update(<myState>(state: myState): myState => ({ ...state, age }));
};

const initState = {
	name: "luis",
	lastName: "frias",
	age: 29,
}

const state = {
	...initState,
	changeName,
	changeLastName,
	changeAge
}


describe('Pruebas del funcionamiento externo', () => {

	it('Lanza error al no pasar los parametros requeridos.', () => {
		expect(() => createWarehouse<myState, myActions>()).toThrowError("You must provide a value for the 'initialState' argument.")
		expect(() => createWarehouse(state)).not.toThrowError();
	})

	it('El useInitialize no debe lazar error.', () => {
		expect(() => createWarehouse<myState, myActions>(state)).not.toThrowError()
	})

	it('El primer valor de la tupla es un object.', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>())
		expect(result.current[0]).toBeTypeOf("object");
	})

	it('El segundo valor de la tupla es una funcion.', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>());
		expect(result.current[1]).toBeTypeOf("object");
	})

	it('El objecto retornado debe ser igual a', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>([]));
		expect(result.current[0]).toStrictEqual({});
	})


	it('El objecto retornado debe ser igual a  mnfo.', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>(["all"]));
		expect(result.current[0]).toEqual(initState);
	})

	it('Cambia el valor de la propiedad \'name\' por \'jose\'.', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>(["name"]));
		act(() => result.current[1].changeName("jose"));
		expect(result.current[0].name).toBe("jose");
	})

	it('La propiedad \'age\' no debe existir.', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>(["name"]));
		expect(result.current[0].age).toBeUndefined();
	})

	it('La.', () => {
		const { result } = renderHook(() => useActions<myActions>());
		expect(result.current).toBeTypeOf("object");
	})

	it('La 2.', () => {
		const { result } = renderHook(() => useActions<myActions>());
		act(() => result.current.changeName("carlos"));
	})

	it('La 3.', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>(["name"]));
		expect(result.current[0].name).toBe("carlos");
	})

	it('La 4.', () => {
		act(() => update(<myState>(state: myState): myState => ({ ...state, name:'maikol' })));
	})
	
	it('La 5.', () => {
		const { result } = renderHook(() => useSubscriberState<myState, myActions>(["name"]));
		expect(result.current[0].name).toBe("maikol");
	})
})
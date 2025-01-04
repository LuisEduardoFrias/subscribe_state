import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react';
import { useActions, update, useSubscriberState, createWarehouse } from "../dist/index.js"

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

const state = {
	name: "luis",
	lastName: "frias",
	age: 29,

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
	/*				it('El primer valor de la tupla es un object.', () => 						const { result } = renderHook(() => useSubscribeState([])			
		expect(result.current[0]).toBeTypeOf("object		);
			})
	
	it('El segundo valor de la tupla es una funcion.', (			=> {
		const { result } = renderHook(() => useSubscribeStat			[]));
		expect(result.current[1]).toBeTypeOf("fun		tio	n		);
	})
	
	it('El objecto retornado debe ser igual a {}			, () => {
		const { result } = renderHook(() => useSubscrib			tate([]));
		expect(result.current[0]).toStr		ctE	q		al({});
	})
	
	it('El objecto retornado debe ser igual a  m			nfo.', () => {
	it('El objecto retornado debe ser igual a  m			nfo.', () => {
		const { result } = renderHook(() => useSubscrib			tate(["all"]));
		expect(result.current[0]		.to	E		ual(myInfo);
	})
	
	it('Cambia el valor de la propiedad \'name\' po			\'jose\'.', () => {
		const { result } = renderHook(() => useSubs			ibeState(["name"]));
		act(() => result.current[1]({ type: "changeN			e", name: "jose" }));
		expect(result.curren		[0]	.		ame).toBe("jose");
	})
	
	it('La propiedad \'age\'			o debe existir.', () => {
		const { result } = renderHook(() => u			SubscribeState(["name"]));
		expect(result.cur		ent		0].age).toBeUndefined();
	})
	*/
})
/*
describe('Pruebas del fun	ionamiento interno.', () => {

	it('Retorna una ins		ncia de Initialize.', () => {
		expect(Initialize.getInstanc	()).	oBeInstanceOf(Initialize)
	})

	it('Verificar que se inivial		o el estado global.', () => {
		const initialized: Initial		e = Initialize.getInstance();
		expect(initializ	d.globalState).toEqual(myInfo)
	})
})
*/
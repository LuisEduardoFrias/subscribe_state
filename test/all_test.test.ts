import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react';
import useInitialize, { Initialize } from "../lib/initialize_super_state.ts"
import useSuperState, { dispatch } from "../lib/super_state.ts"

type MyInfo = {
    name: string,
    lastName: string,
    age: number
}

type Action =
    { type: "changeName", name: string } |
    { type: "changeLastName", lastName: string } |
    { type: "changeAge", age: number }

const reducer = (state: MyInfo, action: Action) => {
    const actions = {
        changeName: () => {
            return { ...state, name: action.name }
        },
        changeLastName: () => {
            return { ...state, lastName: action.lastName }
        },
        changeAge: () => {
            return { ...state, age: age.paiload }
        },
        default: () => {
            throw new Error(`La accion ${action.type} no es valida.`);
        }
    }

    return (actions[action.type] ?? action["dafault"])()
}

const myInfo: MyInfo = {
    name: "luis",
    lastName: "frias",
    age: 29
}

describe('all_test', () => {
    it('Lanza error al no pasar los parametros requeridos.', () => {
        expect(() => useInitialize<MyInfo>()).toThrowError('The reducer parameter is required for instance Initialize.\nThe initialState parameter is required for instance Initialize.')
        expect(() => useInitialize<MyInfo>(reducer)).toThrowError('The initialState parameter is required for instance Initialize.')
    })

    it('Retorna una instancia de Initialize', () => {
        useInitialize<MyInfo>(reducer, myInfo)
        expect(Initialize.getInstance()).toBeInstanceOf(Initialize)
    })

    it('Verificar que se inivializo el estado global', () => {
        const initialized: Initialize = Initialize.getInstance();
        expect(initialized.clone().globalState).toBe(myInfo)
    })

    it('El primer valor de la tupla es un object.', () => {
        const { result } = renderHook(() => useSuperState([]));
        expect(result.current[0]).toBeTypeOf("object");
    })

    it('El segundo valor de la tupla es una funcion', () => {
        const { result } = renderHook(() => useSuperState([]));
        expect(result.current[1]).toBeTypeOf("function");
    })

    it('El objecto retornado debe ser igual a {}.', () => {
        const { result } = renderHook(() => useSuperState([]));
        expect(result.current[0]).toStrictEqual({});
    })

    it('El objecto retornado debe ser igual a  myInfo.', () => {
        const { result } = renderHook(() => useSuperState(["all"]));
        expect(result.current[0]).toEqual(myInfo);
    })

    it('Cambia el valor de la propiedad \'name\' por \'jose\'', () => {
        const { result } = renderHook(() => useSuperState(["name"]));
        act(() => result.current[1]({ type: "changeName", name: "jose" }));
        expect(result.current[0].name).toBe("jose");
    })

    it('La propiedad age no debe existir', () => {
        const { result } = renderHook(() => useSuperState(["name"]));
        expect(result.current[0].age).toBeUndefined();
    })
})
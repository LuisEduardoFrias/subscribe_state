import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react';

//import /* useInitialize,*/ { Initialize } from "../lib/initialize_super_state"
//import useSubscribeState, { dispatch } from "../lib/subscribe_state"
//import useInitialize, { useSubscribeState, dispatch } from "../index"

/*
    function changeName(name: string) {
        console.log("--------------")
        this.name = name;
    }
 
    class Direction {
        constructor(stret: string, numb: number) {
            this.stret = stret;
            this.numb = numb;
            this.obj = { name: "carlo", skills: ["sk1", "sk2"] };
        }
    }
 
    class Skill {
        constructor(name: string, rank: number) {
            this.name = name;
            this.rank = rank;
        }
    }
 
    class Persona {
 
        private static _instance: Persona;
 
        public static getInstance(): Persona {
            if (!Persona._instance) {
                Persona._instance = new Persona();
            }
 
            return Persona._instance;
        }
 
        constructor() {
            this.name = "luis";
            this.age = 29;
            this.isJob = false;
            this.skills = [new Skill("c#", 8.7), new Skill("react", 5.6)];
            this.direction = new Direction("c", 29);
            this.otros = ["primero", "segundo", "tercero"];
        }
 
        public clone(): this {
            return structuredClone(this)
        }
    }
*/

/*
type Antion = (sett: setter, ...args: any) => void;

type setter = (value: any) => void;

type MyInfo = {
  name: string,
  lastName: string,
  age: number,
  changeName: Antion;
  //changeLastName: () => void
}

type referent = { result: { current: [obj: MyInfo, fn: (obj: any) => void] } }

type Action =
  { type: "changeName", name: string } |
  { type: "changeLastName", lastName: string } |
  { type: "changeAge", age: number };

const reducer = (state: MyInfo, action: Action) => {
  const actions = {
    changeName: () => {
      return { ...state, name: action.name }
    },
    changeLastName: () => {
      return { ...state, lastName: action.lastName }
    },
    changeAge: () => {
      return { ...state, age: action.age }
    },
    default: () => {
      throw new Error(`La accion ${action.type} no es valida.`);
    }
  }

  return (actions[action.type] ?? actions["default"])()
}

const myInfo: MyInfo = {
  name: "luis",
  lastName: "frias",
  age: 29,
  changeName: (sett: setter, value: string) => { sett(value) },
  ///changeLastName: () => { console.log("se ejecuto changeLastName"); }
}

describe('Pruebas del funcionamiento externo', () => {

  it('Lanza error al no pasar los parametros requeridos.', () => {
    expect(() => useInitialize<MyInfo>()).toThrowError('The reducer parameter is required for instance Initialize.\nThe initialState parameter is required for instance Initialize.')
    expect(() => useInitialize<MyInfo>(reducer)).toThrowError('The initialState parameter is required for instance Initialize.')
  })

  it('El useInitialize no debe lazar error.', () => {
    expect(() => useInitialize<MyInfo>(reducer, myInfo)).not.toThrowError();
  })
  

  it('El primer valor de la tupla es un object.', () => {
    const { result } = renderHook(() => useSubscribeState([]));

    expect(result.current[0]).toBeTypeOf("object");
  })
  it('El segundo valor de la tupla es una funcion.', () => {
    const { result } = renderHook(() => useSubscribeState([]));
    expect(result.current[1]).toBeTypeOf("function");
  })

  it('El objecto retornado debe ser igual a {}.', () => {
    const { result } = renderHook(() => useSubscribeState([]));
    expect(result.current[0]).toStrictEqual({});
  })

  it('El objecto retornado debe ser igual a  myInfo.', () => {
    const { result } = renderHook(() => useSubscribeState(["all"]));
    expect(result.current[0]).toEqual(myInfo);
  })

  it('Cambia el valor de la propiedad \'name\' por \'jose\'.', () => {
    const { result } = renderHook(() => useSubscribeState(["name"])) as referent;
    act(() => result.current[1]({ type: "changeName", name: "jose" }));
    expect(result.current[0].name).toBe("jose");
  })

  it('La propiedad \'age\' no debe existir.', () => {
    const { result } = renderHook(() => useSubscribeState(["name"])) as referent;
    expect(result.current[0].age).toBeUndefined();
  })
});

describe('Pruebas del funcionamiento interno.', () => {
  it('Retorna una instancia de Initialize.', () => {
    expect(Initialize.getInstance()).toBeInstanceOf(Initialize)
  })

  it('Verificar que se inicializo el estado global.', () => {
    const initialized: Initialize<MyInfo> = Initialize.getInstance();
    expect(initialized.globalState).toEqual(myInfo)
  })

  it('Verificar que solo se lee 1 vez. p1', () => {
    const { result } = renderHook(() => useSubscribeState(["name"], true)) as referent;
    act(() => result.current[1]({ type: "changeName", name: "carlos" }));
    expect(result.current[0].name).toBe("jose");
  })

  it('Verificar que solo se lee 1 vez. p2', () => {
    const { result } = renderHook(() => useSubscribeState(["name"])) as referent;
    expect(result.current[0].name).toBe("carlos");
  })

  it('Ejecutando funciones del estado.', () => {
    console.log('check first: ', Initialize.getInstance().globalState);
    const { result } = renderHook(() => useSubscribeState(["name", "changeName"])) as referent;
    act(() => result.current[0].changeName((value: any) => { console.log(value) }, 'Martirn'));
    expect(result.current[0].name).toBe("carlos");
    console.log('check finich2: ', Initialize.getInstance().globalState)
  })
});
*/

import subscriber from '../lib/constants'

describe('Pruebas del funcionamiento interno.', () => {

  it('Ejecutando funciones del estado.', () => {

    const { state, actions } = subscriber(['name']);

    actions.onChange("hola " + state+"!")

    /*
    console.log(result.current)
   
    expect(result.current[0].name).toBe("carlos");
    expect(result.current[0]).toBeTypeOf("object");
    




  expect(
      (update: setterType): myState => {  return {}}
    ({
         name: 'luis',
         age: 30,
         onChange: (name: string) => {
           update((state: myState) => {
             return {
               ...state, name
             }
           })
         }
       }))
  ).toBeInstanceOf(Function)
       */
  })
});
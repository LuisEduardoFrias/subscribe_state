# subscriber_state
** Un manejador de estado global simple y flexible para aplicaciones React **

## Descripción
Subscribe_state es un paquete de TypeScript diseñado para simplificar la gestión del estado global en aplicaciones React. 
Ofrec0e una API intuitiva para definir el estado inicial, crear acciones y
suscribir componentes a los cambios de estado.

## Características clave:
 * Definición declarativa del estado: Define el estado inicial y las acciones de manera clara y concisa.
 * Tipos seguros: TypeScript garantiza la seguridad de tipos en todo el código.
 * Suscripción flexible: Suscríbete a cualquier parte del estado utilizando strings o arrays.
 * Rendimiento optimizado: Evita re-renderizados innecesarios gracias a la opción de deshabilitar las actualizaciones automáticas.
 * API sencilla: Una API intuitiva y fácil de aprender.

## Instalación
```bash
  npm install subscriber_state
```

## API
  * createWarehouse: Función principal para crear un almacén de estado.
    * Descripción detallada: Esta función se utiliza para definir el estado inicial de una aplicación y las acciones que pueden modificar ese estado. 
      El estado inicial se proporciona como un objeto que cumple con el tipo T, y las acciones se definen como funciones que modifican el estado.
      La función createWarehouse crea un almacén que puede ser utilizado para suscribirse a cambios en el estado y realizar actualizaciones.
    
    * Firma:
      createWarehouse<T, K>(createInitialState: (update: Update) => T & K | (T & K))

      * T: Tipo del estado de la aplicación.
      * K: Tipo de las acciones que pueden modificar el estado.
      * createInitialState: Función que recibe una función de actualización
      (update) y devuelve el estado inicial u objeto de que cumple con los tipos
      T y K

  * update: Función realiza una llanada a actializar el estado.

  * useActions: El hook useActions, es una utilidad para acceder y utilizar las acciones definidas dentro de un almacén de estado global.
    Ofrece una manera conveniente de interactuar directamente con el estado, desencadenando actualizaciones.
    
    * Descripción:
      * Recuperando Acciones: El hook permite obtener acciones específicas o todas ellas desde el almacén de estado global.
      * Selección de Acciones: Puedes especificar acciones individuales por nombre o solicitar todas las acciones a la vez.
 
    * Firma:
      useActions<T>(actions: string | string[]): { [key in keyof T]: Action }

      * Tipo Genérico T: Representa el tipo del objeto de acciones, que se infiere del parámetro actions.
      
      * Parámetro actions:
        * String: Puede ser un nombre de acción único.
        * Array de Strings: Puede ser un array de nombres de acciones.
      
      * Tipo de Retorno: Un objeto que contiene las acciones especificadas como funciones.

  * useSubscriber: Hook para suscribirse a propiedades del estado.
    * Descripción detallada: useSubscriber te permite "escuchar" los cambios que ocurren en una o varias propiedades de tu estado global. 
    Cuando alguna de estas propiedades se actualiza, tu componente se re-renderizará automáticamente, reflejando los nuevos valores.

    * Parámetros:
      * Primer parámetro (string o array de strings): Indica las propiedades específicas a las que quieres suscribirte. Puedes pasar un string con el nombre de una propiedad, un array de strings con múltiples nombres, o la palabra "all" para suscribirte a todas las propiedades.
      * Segundo parámetro (booleano, opcional): Este parámetro, que por defecto
      es false, te permite controlar si quieres que tu componente se
      re-renderice inmediatamente cuando se actualicen las propiedades
      suscritas. 
      Si lo estableces en true, el re-renderizado se evetara.
      
    * Retorno: 
      El hook useSubscriber devuelve una tupla (un array) con dos elementos:
      * objeto 1: Contiene las propiedades a las que te has suscrito. Puedes acceder a sus valores directamente.
      * objeto 2: Contiene todas las acciones disponibles en tu almacén de estado. Esto te permite modificar el estado si es necesario.

## Uso básico

### createWarehouse
Ejemolo 1:
```ts
import { createWarehouse, update } from 'subscriber_state';

type State = {
  counter: number,
  text: string,
  darkMode: boolean
}

type Actions = {
  onIncrementCounter: () => void,
  onChangeText: (text: string) => void,
  onChangeDarkMode: (isDarkMode: boolean) => void
}

function onIncrementCounter() {
  update<State>((state: State): State => {
    return ({ ...state, counter: state.counter + 1 })
  })
};

function onChangeText(text: string) {
  update<State>((state: State): State => ({ ...state, text }))
};

function onChangeDarkMode(isDarkMode: boolean) {
  update<State>((state: State): State => ({ ...state, darkMode: isDarkMode }))
};

createWarehouse<State, Actions>({
  counter: 0,
  text: 'wold',
  darkMode: true,
  onIncrementCounter,
  onChangeText,
  onChangeDarkMode
});
```

Ejemolo 2:
```ts
import { createWarehouse, type Update } from 'subscriber_state';

type State = {
  counter: number,
  text: string,
  darkMode: boolean
}

type Actions = {
  onIncrementCounter: () => void,
  onChangeText: (text: string) => void,
  onChangeDarkMode: (isDarkMode: boolean) => void
}

createWarehouse<State, Actions>((update: Update)=>({
  counter: 0,
  text: 'wold',
  darkMode: true,
  onIncrementCounter: () => {
    update<State>((state: State): State => {
      return ({ ...state, counter: state.counter + 1 })
    })
  },
  onChangeText: (text: string) => {
    update<State>((state: State): State => ({ ...state, text }))
  },
  onChangeDarkMode: (isDarkMode: boolean) => {
    update<State>((state: State): State => ({ ...state, darkMode: isDarkMode }))
  }
}));
```

### useActions
Ejemplo 1:
```tsx
import { useActions } from 'subscriber_state'

function App() {
  //Acción Específica: Este ejemplo extrae directamente la acción onIncrementCounter del almacén.
  const { onChangeText } = useActions(["onChangeText"]);
  
  //Uso: La función onIncrementCounter puede ser llamada para desencadenar la actualización de estado correspondiente.
  return (
    <input name="name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeText(event.target.value)} />
  );
}
```

Ejemplo 2:
```tsx
import { useActions } from 'subscriber_state'

function App() {
  // Todas las Acciones: Este ejemplo recupera todas las acciones definidas en el almacén.
  const actions = useActions();
//const actions = useActions('all');

 // Uso: El objeto actions puede ser utilizado para acceder a cualquier acción por su nombre. Por ejemplo, actions.onIncrementCounter() o actions.onChangeText('new text').
 return (
    <button onClick={actions.onIncrementCounter}>to raise</button>
 )
}
```

### useSubscriber
ejemplo 1
```tsx
 import { useSubscriber } from 'subscriber_state'

export default function InsertText() {
  const [{ darkMode }, { onChangeText }] = useSubscriber('darkMode');

  return (...);
}
```

ejemplo 2
```tsx
import { useSubscriber } from 'subscriber_state'

export default function InsertText() {
  const [state, { onChangeText }] = useSubscriber(['darkMode', 'counter']);

  const color: state.darkMode ? '#0a9aff' : '#000000';
  //chroma libreria externa.
  const complementaryColor = chroma(color).complementary().hex();
  
  const _divStyle = {
    padding: '10px',
    border: `2px solid ${complementaryColor}`,
    backgroundColor: color
  }
  
  const _spanStyle = { color }
  
  return (
    <div style={_divStyle}>
    ...
    <span style={_spanStyle} >{state.counter}</span>
    ...
    </div>
  );
}
```
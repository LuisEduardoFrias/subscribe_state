# subscription_state

SuperState es un paquete creado para manejar el estado global de una aplicación de React.
Ofrece un método de suscripción a las propiedades del estado, así como dos métodos esenciales para su funcionalidad.

## Instalación

Para instalar SuperState, puedes hacerlo a través de npm:
```bash
npm install super_state
```

## Uso

### initializeSuperState

El método `initializeSuperState` se utiliza para inicializar el estado y agregar el reducer.
Ambos son parámetros requeridos.

Aquí tienes un ejemplo de cómo usarlo:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initialState from "./helpers/initial_state";
import Reducer from "./helpers/reducer.ts";
import initializeSuperState from "super_state";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);

function Main() {
	initializeSuperState(Reducer, initialState());
	return <App />;
}
```

### useSuperState

El hook `useSuperState` se utiliza para suscribirse a las propiedades del estado.
Recibe un arreglo de strings, donde cada string representa el nombre de una propiedad de estado.
El hook retorna el estado y un dispatch para realizar acciones sobre el estado.

Aquí tienes un ejemplo de cómo usarlo:

```jsx
import { useRef } from "react";
import { useSuperState } from "super_state";
import { actions } from "./helpers/reducer";
import Styles from "./styles/app.module.css";

export default function App() {
	const [state, dispatch] = useSuperState(["isTyping", "text"]);

	const inputRef = useRef(null);
	const timeoutRef = useRef(null);

	function handleChange(event: any) {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		dispatch({ type: actions.typing, value: true });

		timeoutRef.current = setTimeout(() => {
			dispatch({ type: actions.typing, value: false });
		}, 1000);
	}

	function handleClick() {
		dispatch({ type: actions.send_writed, value: inputRef.current.value });
	}

	return (
		<div className={Styles.container}>
			{/* ... */}
		</div>
	);
}
```

## Contribuir

Si deseas contribuir a SuperState, puedes abrir un issue o enviar un pull request en el repositorio de [GitHub](https://github.com/luiseduardofrias/super_state).

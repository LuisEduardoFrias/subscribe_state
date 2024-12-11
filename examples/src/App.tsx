
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShowCounter from './show_counter'
import ThemeDark from './theme_dark'
import InsertText from './insert_text'
import ShowText from './show_text'

import { useActions } from 'subscribe_state'

function App() {
  const { onIncrementCounter } = useActions(["onIncrementCounter"]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={onIncrementCounter}>
          count
        </button>
      </div>

      <ShowCounter />
      <ThemeDark />
      <InsertText />
      <ShowText />
    </>
  )
}

export default App

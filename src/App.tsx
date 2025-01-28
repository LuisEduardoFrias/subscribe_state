
import reactLogo from './assets/react.svg'
import ShowCounter from './show_counter'
import ThemeDark from './theme_dark'
import InsertText from './insert_text'
import ShowText from './show_text'
import './App.css'

import { useActions } from '../lib/' //'subscriber_state'

function App() {
  const { onIncrementCounter } = useActions(["onIncrementCounter"]);

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <h1>Subscribe state</h1>

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

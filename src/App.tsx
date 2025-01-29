
import reactLogo from './assets/react.svg'
import ShowCounter from './show_counter'
import ThemeDark from './theme_dark'
import InsertText from './insert_text'
import ShowText from './show_text'
import Card from './card'
import './App.css'

import { useActions } from '../lib/' //'subscriber_state'

function App() {
  const { onIncrementCounter } = useActions(["onIncrementCounter"]);

  const datas = [
    { title: 'level 1', key: '1' },
    { title: 'level 2', key: '2' },
    { title: 'level 3', key: '3' },
    { title: 'level 4', key: '4' },
    { title: 'level 5', key: '5' },
  ]

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

      <div style={{
        border: '1px solid red', padding: '10px', display:
          'flex', flexWrap: 'wrap', gap: '10px',
      }}>
        {datas.map((ob,index) => <Card key={index} data={ob} />)}
      </div>

      <ShowCounter />
      <ThemeDark />
      <InsertText />
      <ShowText />
    </>
  )
}

export default App

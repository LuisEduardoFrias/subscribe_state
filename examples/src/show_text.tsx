
import React from 'react'
import {useSubscriberState} from 'subscribe_state'

export default function ShowText() {
  const [{ text }, { onChangeDarkMode }] = useSubscriberState(['text']);

  return (
    <div style={{
      border: '2px solid black', padding: '5px', display: 'flex',
      flexDirection: 'column', gap: '10px', backgroundColor: 'blue',
      margin: '10px'
    }}>
      <div style={{ border: '2px solid black', padding: '5px' }}>
        <label htmlFor="darkmode">Is dark mode</label>
        <input id='darkmode' defaultChecked type="checkbox" onChange={(event:
          React.ChangeEvent<HTMLInputElement>) =>
          onChangeDarkMode(event.target.checked)} />
      </div>
      <span>Text: {text}</span>
    </div>
  )
}
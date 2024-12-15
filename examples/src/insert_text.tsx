
import React from 'react'
import {useSubscriber} from 'subscribe_state'

export default function InsertText() {
  const [{ darkMode }, { onChangeText }] = useSubscriber(['darkMode'],true);

  return (
    <div style={{
      border: `2px solid ${darkMode ? 'black' : '#7f7f7f'}`,
      padding: '5px', display: 'flex', gap: '10px'
    }}>
      <label htmlFor="textchange">Text:</label>
      <input id="textchange" onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeText(event.target.value)} />
    </div>
  )
}
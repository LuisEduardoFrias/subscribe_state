
import React from 'react'
import {useSubscriberState} from '../lib/' //'subscriber_state'
import { useChangeColor } from './use_change_color' //'subscriber_state'

export default function ShowText() {
  const [{ text }, { onChangeDarkMode }] = useSubscriberState(['text']);
const color = useChangeColor();

  return (
    <div style={{
      border: '2px solid black', padding: '5px', display: 'flex',
      flexDirection: 'column', gap: '10px', backgroundColor: 'blue',
      margin: '10px'
    }}>
      <div style={{ backgroundColor: color, width: '30px', height: '30px' }}></div>
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
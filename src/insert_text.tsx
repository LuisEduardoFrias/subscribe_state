
import Reac, { ChangeEvent } from 'react'
import { useSubscriberState } from '../lib/' //'subscriber_state'
import { useChangeColor } from './use_change_color' //'subscriber_state'

export default function InsertText() {
  const [{ darkMode }, { onChangeText }] = useSubscriberState(['darkMode'], true);
  const color = useChangeColor();

  return (
    <div style={{
      border: `2px solid ${darkMode ? 'black' : '#7f7f7f'}`,
      padding: '5px', display: 'flex', gap: '10px'
    }}>

      <div style={{ backgroundColor: color, width: '30px', height: '30px' }}></div>
      <label htmlFor="textchange">Text:</label>
      <input id="textchange" onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeText(event.target.value)} />
    </div>
  )
}
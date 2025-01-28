
import { useSubscriberState } from '../lib/' //'subscriber_state'
import { useChangeColor } from './use_change_color' //'subscriber_state'

export default function ShowCounter() {
  const [{ counter }] = useSubscriberState(['counter']);
  const color = useChangeColor();

  return (
    <div style={{ displey: 'flex', padding: '5px', border: '2px solid red', margin: '10px' }}>
      <div style={{backgroundColor: color, width: '30px', height: '30px'}}></div>
      <h2>Show Counter</h2>
      <span>This counter is :</span>
      <span>{counter}</span>
    </div>
  )
}
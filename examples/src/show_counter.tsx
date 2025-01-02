
import { useSubscriberState } from 'subscribe_state'

export default function ShowCounter() {
  const [{ counter }] = useSubscriberState(['counter']);

  return (
    <div style={{ displey: 'flex', padding: '5px', border: '2px solid red', margin: '10px' }}>
      <h2>Show Counter</h2>
      <span>This counter is :</span>
      <span>{counter}</span>
    </div>
  )
}
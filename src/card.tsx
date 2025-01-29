
import { useSubscriberState } from '../lib/' //'subscriber_state'

export default function Card({ data }: { data: { title: string, key: string } }) {
  const [{ select }, { onSelected }] = useSubscriberState(['select']);

  const isSelect = select.includes(data.key);

  function handleSelect(key: string) {
    onSelected(key)
  }

  const Styles = {
    backgroundColor: 'black',
    borderWidth: isSelect ? '2px' : '0.5px',
    borderColor: isSelect ? '#2cfcff' : 'white',
    borderStyle: 'solid',
    borderRadius: '10px',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div id='card' style={Styles} onClick={() => handleSelect(data.key)}>
      <label>Title: {data.title}</label>
    </div>
  )
}
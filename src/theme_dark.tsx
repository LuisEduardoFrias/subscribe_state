
import { useSubscriberState } from '../lib/' //'subscriber_state'
import { useChangeColor } from './use_change_color' //'subscriber_state'

export default function ThemeDark() {
  const [{ darkMode }] = useSubscriberState(['darkMode']);
const color = useChangeColor();

  const _Style = {
    backgroundColor: darkMode ? 'black' : 'white',
    color: !darkMode ? 'black' : 'white',
    padding: '10px',
    margin: '10px'
  }

  return (
    <div style={_Style} >
      <div style={{ backgroundColor: color, width: '30px', height: '30px' }}></div>
      <h2>{'Ejemplos de texto para etiquetas <p>'}</h2>

      <h3>Opciones generales:</h3>
      <ol>
        <li>Este es un párrafo de ejemplo.</li>
        <li>Aquí encontrarás información interesante.</li>
        <li>Bienvenido a mi página web.</li>
        <li>¡Explora y descubre!</li>
      </ol>

    </div >
  )
}
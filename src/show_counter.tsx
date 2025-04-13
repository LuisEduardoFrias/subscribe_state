import { useSubscriberState } from '../lib/' //'subscriber_state'
import { useChangeColor } from './use_change_color' //'subscriber_state'
import useTranslate from './use_translate'

export default function ShowCounter() {
	const [{ counter }] = useSubscriberState(['counter']);
	const translate = useTranslate();
	const color = useChangeColor();

	return (
		<div style={{ displey: 'flex', padding: '5px', border: '2px solid red', margin: '10px' }}>
			<div style={{ backgroundColor: color, width: '30px', height: '30px' }}></div>
			<h1 style={{ color: "#17d5ff",margin:'10px'}}>{translate('counter')}</h1>

			<h2>Show {translate('counter')}</h2>
			<span>This counter is :</span>
			<span>{counter}</span>
		</div>
	)
}
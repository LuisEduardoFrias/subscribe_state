import { ChangeEvent } from 'react'
import { useSubscriberState } from '../lib/' //'subscriber_state'
import { useChangeColor } from './use_change_color' //'subscriber_state'
import useTranslate from './use_translate'

export default function InsertText() {
	const [{ darkMode }, { onChangeText }] = useSubscriberState(['darkMode'], true);
	const translate = useTranslate();
	const color = useChangeColor();

	return (
		<div style={{
			border: `2px solid ${darkMode ? 'black' : '#7f7f7f'}`,
			padding: '5px', display: 'flex', gap: '10px'
		}}>
			<h1 style={{ color: "#17d5ff",margin:'10px'}}>{translate('insert')}</h1>

			<div style={{ backgroundColor: color, width: '30px', height: '30px' }}></div>
			<label htmlFor="textchange">{translate('insert')}</label>
			<input id="textchange" onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeText(event.target.value)} />
		</div>
	)
}
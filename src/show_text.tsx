
import { ChangeEvent } from 'react'
import { useSubscriberState } from '../lib/' //'subscriber_state'
import { useChangeColor } from './use_change_color' //'subscriber_state'
import useTranslate from './use_translate'

export default function ShowText() {
	const [{ text }, { onChangeDarkMode }] = useSubscriberState(['text']);
	const translate = useTranslate();
	const color = useChangeColor();

	return (
		<div style={{
			border: '2px solid black', padding: '5px', display: 'flex',
			flexDirection: 'column', gap: '10px', backgroundColor: 'blue',
			margin: '10px'
		}}>
			<div style={{ backgroundColor: color, width: '30px', height: '30px' }}></div>
			<div style={{ border: '2px solid black', padding: '5px' }}>
						<h1 style={{ color: "#17d5ff",margin:'10px'}}>{translate('text')}</h1>

				<label htmlFor="darkmode">{translate('text')}</label>
				<label htmlFor="darkmode">Is dark mode</label>
				<input id='darkmode' defaultChecked type="checkbox" onChange={(event:
					ChangeEvent<HTMLInputElement>) =>
					onChangeDarkMode(event.target.checked)} />
			</div>
			<span>Text: {text}</span>
		</div>
	)
}
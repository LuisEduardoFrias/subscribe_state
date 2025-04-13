import { useState, ChangeEvent } from 'react'
import { useSubscriberState } from '../lib/'
import useTranslate from './use_translate'

type TypeLanguage = {
	key: string;
	value: string;
}

const languages = [
	{
		key: "es",
		value: "Spanich"
	},
	{
		key: "en",
		value: "English"
	}
]

export default function SelectLanguage() {
	const [{ language }, { changeLanguage }] = useSubscriberState<State, Actions>('language');
	//const [language, setLanguage] = useState<string>(lang);
	const translate = useTranslate();

	const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
		changeLanguage(event.target.value)
		//	setLanguage(event.target.value)
	};

	return (
		<select
			name="translate"
			style={{
				userSelect: "none",
				fontWeight: "bold",
				color: "white",
				backgroundColor: "transparent",
				borderRadius: "20px",
				width: "7rem",
				border: "2px solid blue",
				padding: "0.25rem"
			}}
			onChange={handleLanguageChange}
			value={language}
		>
			{
				languages && languages.map((lang: TypeLanguage) =>
					<option key={lang.key} value={lang.key}>
						{translate(lang.value)}
					</option>
				)
			}
		</select>
	);
}




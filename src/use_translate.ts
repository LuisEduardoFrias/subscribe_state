import { useEffect, useState } from 'react';
import { useSubscriberState } from '../lib/'

interface TranslationMap {
	[key: string]: string;
}

const languages = [
	{
		"counter": "Contador",
		"theme": "Tema",
		"text": "Textoo",
		"insert": "Insertar"
	},
	{
		"counter": "counter",
		"theme": "theme",
		"text": "text",
		"insert": "insert"
	}
]

export default function useTranslate() {
	const [{ language }] = useSubscriberState<State, Actions>('language');
	const [stateTranslated, setStateTranslated] = useState<TranslationMap>({});

	useEffect(() => {
		if (language) {
			(async () => {
				try {
					setStateTranslated(languages[language === 'es' ? 0 : 1]);
				} catch (error) {
					console.error(`Error loading translation for language ${language}:`, error);
					setStateTranslated({});
				}
			})()
		} else {
			setStateTranslated({});
		}
	}, [language]);

	const translate = (text: string): string => {
		return stateTranslated[text] || text;
	};

	return translate;
}
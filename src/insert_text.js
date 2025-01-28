import React from 'react';
import { useSubscriberState } from '../lib/'; //'subscriber_state'
import { useChangeColor } from './use_change_color'; //'subscriber_state'
export default function InsertText() {
    const [{ darkMode }, { onChangeText }] = useSubscriberState(['darkMode'], true);
    const color = useChangeColor();
    return (React.createElement("div", { style: {
            border: `2px solid ${darkMode ? 'black' : '#7f7f7f'}`,
            padding: '5px', display: 'flex', gap: '10px'
        } },
        React.createElement("div", { style: { backgroundColor: color, width: '30px', height: '30px' } }),
        React.createElement("label", { htmlFor: "textchange" }, "Text:"),
        React.createElement("input", { id: "textchange", onChange: (event) => onChangeText(event.target.value) })));
}

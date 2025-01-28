import React from 'react';
import { useSubscriberState } from '../lib/'; //'subscriber_state'
import { useChangeColor } from './use_change_color'; //'subscriber_state'
export default function ShowText() {
    const [{ text }, { onChangeDarkMode }] = useSubscriberState(['text']);
    const color = useChangeColor();
    return (React.createElement("div", { style: {
            border: '2px solid black', padding: '5px', display: 'flex',
            flexDirection: 'column', gap: '10px', backgroundColor: 'blue',
            margin: '10px'
        } },
        React.createElement("div", { style: { backgroundColor: color, width: '30px', height: '30px' } }),
        React.createElement("div", { style: { border: '2px solid black', padding: '5px' } },
            React.createElement("label", { htmlFor: "darkmode" }, "Is dark mode"),
            React.createElement("input", { id: 'darkmode', defaultChecked: true, type: "checkbox", onChange: (event) => onChangeDarkMode(event.target.checked) })),
        React.createElement("span", null,
            "Text: ",
            text)));
}

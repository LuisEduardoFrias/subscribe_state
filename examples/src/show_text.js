import React from 'react';
import { useSubscriber } from 'subscribe_state';
export default function ShowText() {
    const [{ text }, { onChangeDarkMode }] = useSubscriber(['text']);
    return (React.createElement("div", { style: {
            border: '2px solid black', padding: '5px', display: 'flex',
            flexDirection: 'column', gap: '10px', backgroundColor: 'blue',
            margin: '10px'
        } },
        React.createElement("div", { style: { border: '2px solid black', padding: '5px' } },
            React.createElement("label", { htmlFor: "darkmode" }, "Is dark mode"),
            React.createElement("input", { id: 'darkmode', defaultChecked: true, type: "checkbox", onChange: (event) => onChangeDarkMode(event.target.checked) })),
        React.createElement("span", null,
            "Text: ",
            text)));
}
//# sourceMappingURL=show_text.js.map
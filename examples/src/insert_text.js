import React from 'react';
import { useSubscriber } from 'subscribe_state';
export default function InsertText() {
    const [{ darkMode }, { onChangeText }] = useSubscriber(['darkMode'], true);
    return (React.createElement("div", { style: {
            border: `2px solid ${darkMode ? 'black' : '#7f7f7f'}`,
            padding: '5px', display: 'flex', gap: '10px'
        } },
        React.createElement("label", { htmlFor: "textchange" }, "Text:"),
        React.createElement("input", { id: "textchange", onChange: (event) => onChangeText(event.target.value) })));
}
//# sourceMappingURL=insert_text.js.map
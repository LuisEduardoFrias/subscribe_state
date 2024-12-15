import { useSubscriber } from 'subscribe_state';
export default function ThemeDark() {
    const [{ darkMode }] = useSubscriber(['darkMode']);
    const _Style = {
        backgroundColor: darkMode ? 'black' : 'white',
        color: !darkMode ? 'black' : 'white',
        padding: '10px',
        margin: '10px'
    };
    return (React.createElement("div", { style: _Style },
        React.createElement("h2", null, 'Ejemplos de texto para etiquetas <p>'),
        React.createElement("h3", null, "Opciones generales:"),
        React.createElement("ol", null,
            React.createElement("li", null, "Este es un p\u00E1rrafo de ejemplo."),
            React.createElement("li", null, "Aqu\u00ED encontrar\u00E1s informaci\u00F3n interesante."),
            React.createElement("li", null, "Bienvenido a mi p\u00E1gina web."),
            React.createElement("li", null, "\u00A1Explora y descubre!"))));
}
//# sourceMappingURL=theme_dark.js.map
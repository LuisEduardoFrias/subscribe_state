import { useSubscriberState } from '../lib/'; //'subscriber_state'
import { useChangeColor } from './use_change_color'; //'subscriber_state'
export default function ShowCounter() {
    const [{ counter }] = useSubscriberState(['counter']);
    const color = useChangeColor();
    return (React.createElement("div", { style: { displey: 'flex', padding: '5px', border: '2px solid red', margin: '10px' } },
        React.createElement("div", { style: { backgroundColor: color, width: '30px', height: '30px' } }),
        React.createElement("h2", null, "Show Counter"),
        React.createElement("span", null, "This counter is :"),
        React.createElement("span", null, counter)));
}

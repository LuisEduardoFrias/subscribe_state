import { useSubscriberState } from 'subscribe_state';
export default function ShowCounter() {
    const [{ counter }] = useSubscriberState(['counter']);
    return (React.createElement("div", { style: { displey: 'flex', padding: '5px', border: '2px solid red', margin: '10px' } },
        React.createElement("h2", null, "Show Counter"),
        React.createElement("span", null, "This counter is :"),
        React.createElement("span", null, counter)));
}
//# sourceMappingURL=show_counter.js.map
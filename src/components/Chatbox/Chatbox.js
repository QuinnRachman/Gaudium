import { useState } from 'react';
import './Chatbox.css';

function Chatbox(props) {
    const [messages, updateMessages] = useState([]);

    props.ws.onmessage = (ev) => {
        console.log(ev);
        ev.data.text().then((msg) => {
            const obj = JSON.parse(msg);
            const temp = [];
            temp.push(<div className="Chatbox-message">{obj.userName} said: {obj.message}</div>);
            updateMessages(messages.concat(temp));
        });
    }

    return (
        <div className="Chatbox">{messages}</div>
    );
}

export default Chatbox;

import { useEffect, useState } from 'react';
import './App.css';
import Chatbox from './Chatbox/Chatbox';
import InputBar from './InputBar/InputBar';

function App() {
	const [socket, setWebsocket] = useState(null);
	const [name, setUsername] = useState(localStorage.getItem("userName"));

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		function connectToWebsocket(url) {
			const ws = new WebSocket(url);

			ws.onerror = (ev) => {
				const choice = window.confirm("Connection to server failed, retry?");

				if (choice) window.location.reload();
			}

			return ws;
		}

		if (name === null) {
			const userName = window.prompt("Please enter a username");

			localStorage.setItem("userName", userName);
			setUsername(userName);
		} else {
			document.title = `Using app as ${name}`;
		}

		if (socket === null) {
			const ws = connectToWebsocket('ws://localhost:8080');

			ws.onopen = (ev) => {
				setWebsocket(ws);
				setIsReady(true);
			}
		} 
	}, [name, socket]);

	if (isReady) {
		return (
			<div className="App">
				<div className="App-middle">
					<Chatbox ws={socket} />
					<InputBar ws={socket} userName={name} />
				</div>
			</div>
		);
	} else {
		return null;
	}
}

export default App;

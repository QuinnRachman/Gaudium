import './InputBar.css';

function InputBar(props) {
	return (
		<input onKeyUpCapture={(ev) => {
				if (ev.key === "Enter") {
					const inputEl = ev.target
					if (inputEl.value.length !== 0) {
						props.ws.send(JSON.stringify({
							userName: props.userName,
							message: inputEl.value,
							date: new Date().toTimeString(),
						}));
						inputEl.value = "";
					}
				}
			}
		} type="text" className="InputBar" />
	);
}

export default InputBar;

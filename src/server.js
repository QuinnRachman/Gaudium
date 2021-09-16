const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 8080,
});

console.log(`Server started on port 8080`);

wss.on("connection", (ws) => {
    console.log("User connected");

    ws.on("message", (msg) => {
        console.log(msg.toString());

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(msg);
        })
    });

    ws.on("close", () => {
        console.log("User disconnected");
    });
});
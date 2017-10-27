"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const router_1 = require("./router");
const app = express();
app.use(express.static('webapp/dist'));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const appRouter = new router_1.AppRouter(wss);
wss.on('connection', (ws) => {
    ws.on('pong', () => {
    });
    ws.on('message', (data) => {
        console.log('received: %s', data);
        let _data = JSON.parse(data);
        appRouter.onMessage(ws, _data);
    });
    appRouter.sendRooms(ws);
    appRouter.sendUsers(ws);
});
setInterval(() => {
    appRouter.removeDisconnectedUsers(wss.clients);
    wss.clients.forEach((ws) => {
        ws.ping(null, false, true);
    });
}, 5000);
//start our server
server.listen(process.env.PORT || 4100, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
//# sourceMappingURL=server.js.map
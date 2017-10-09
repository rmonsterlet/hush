import { WsAction } from '../../shared/WsAction';
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { RoomManager } from './room';

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const roomManager = new RoomManager(wss)

export interface ExtWebSocket extends WebSocket {
  isAlive: boolean
}

wss.on('connection', (ws: ExtWebSocket) => {

  ws.isAlive = true

  ws.on('pong', () => {
    ws.isAlive = true
  })
  ws.on('message', (data: string) => {
    roomManager.onMessage(data)
  })

  roomManager.sendRooms(ws)
})

setInterval(() => {
  wss.clients.forEach((ws: ExtWebSocket) => {

    if (!ws.isAlive)
      return ws.terminate()

    ws.isAlive = false
    ws.ping(null, false, true)
  })
}, 10000)

//start our server
server.listen(process.env.PORT || 4100, () => {
  console.log(`Server started on port ${server.address().port} :)`)
})
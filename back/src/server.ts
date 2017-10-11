import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AppRouter } from './router';

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const appRouter = new AppRouter(wss)

export interface AppWebSocket extends WebSocket {
  isAlive: boolean
  uuid: string
}

wss.on('connection', (ws: AppWebSocket) => {

  ws.isAlive = true

  ws.on('pong', () => {
    ws.isAlive = true
  })
  ws.on('message', (data: string) => {

    console.log('received: %s', data)
    let _data = JSON.parse(data)
    appRouter.onMessage(ws, _data)
  })

  appRouter.sendRooms(ws)
  appRouter.sendUsers(ws)
})

setInterval(() => {
  wss.clients.forEach((ws: AppWebSocket) => {

    if (!ws.isAlive){
      //FIXME
      appRouter.removeUser(ws.uuid)
      return ws.terminate()
    }
      

    ws.isAlive = false
    ws.ping(null, false, true)
  })
}, 5000)

//start our server
server.listen(process.env.PORT || 4100, () => {
  console.log(`Server started on port ${server.address().port} :)`)
})
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express()

//initialize a simple http server
const server = http.createServer(app)

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

let rooms = [{
    id: 0,
    messages: new Array()
}]

interface ExtWebSocket extends WebSocket {
    isAlive: boolean
}

wss.on('connection', (ws: ExtWebSocket) => {

    ws.isAlive = true

    ws.on('pong', () => {
        ws.isAlive = true
    })

    //connection is up, let's add a simple simple event
    ws.on('message', (data: string) => {

        let _data = JSON.parse(data)

        //log the received message and send it back to the client
        console.log('received: %s', data)


        if (_data.action === 'CREATE_ROOM') {
            let room = {
                id: rooms.length,
                messages: new Array()
            }
            rooms.push(room)
            wss.clients.forEach(client => {
                client.send(JSON.stringify({
                    action: 'CREATE_ROOM',
                    room: room
                }))
            })
        }
        else if (_data.action === 'BROADCAST') {

            let room = rooms.find(room => room.id === _data.roomId)
            if (!room)
                rooms.forEach(room => {
                    room.messages.push(_data.message)
                })
            else {
                room.messages.push(_data.message)
            }
            wss.clients.forEach(client => {
                client.send(data)
            })
        } 
        else {
            // ws.send(data)
        }
    })

    ws.send(JSON.stringify({
        action: 'UPDATE_ROOMS',
        rooms: rooms
    }))
})

setInterval(() => {
    wss.clients.forEach((ws: ExtWebSocket) => {

        if (!ws.isAlive) return ws.terminate()

        ws.isAlive = false
        ws.ping(null, false, true)
    })
}, 10000)

//start our server
server.listen(process.env.PORT || 4100, () => {
    console.log(`Server started on port ${server.address().port} :)`)
})
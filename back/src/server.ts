import * as express from 'express'
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express()

//initialize a simple http server
const server = http.createServer(app)

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server })

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
        if (_data.broadcast) {

            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    //if (client != ws) {
                        client.send(data)
                    //}    
                })
        } else {
            ws.send(data)
        }
    })

    //send immediatly a feedback to the incoming connection   
    
    const obj = {
        date: new Date(),
        author: 'SYSTEM',
        message: 'Hi there, I am a WebSocket server'
    }
    ws.send(JSON.stringify(obj))
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
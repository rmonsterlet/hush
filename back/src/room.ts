import { WsAction } from "../../shared/WsAction";
import * as WebSocket from 'ws';
import { ExtWebSocket } from "./server";
import * as uuid from 'uuid';

export class RoomManager {

  getDefaultMessage = (room: any) => {
    return {
      date: new Date(),
      text: `Bienvenue dans la Room #${room.index}`,
      user: {
        name: 'Hush.io'
      }
    }
  }

  rooms = [{
    uuid: uuid.v4(),
    index: 0,
    messages: new Array()
  }]
  
  constructor(private wss: WebSocket.Server) { 
    this.rooms[0].messages.push(this.getDefaultMessage(this.rooms[0]))
  }

  public sendRooms(ws: ExtWebSocket) {

    debugger

    ws.send(JSON.stringify({
      action: 0,
      rooms: this.rooms
    }))
  }

  public onMessage(data: any) {

    let _data = JSON.parse(data)

    //log the received message and send it back to the client
    console.log('received: %s', data)

    switch (_data.action) {
      case WsAction.CREATE_ROOM:
        this.createRoom(_data);
        break;
      case WsAction.BROADCAST:
        this.broadcast(_data);
        break;
    }
  }

  private createRoom(_data: any) {

    let room = {
      uuid: uuid.v4(),
      index: this.rooms.length,
      messages: new Array()
    }
    room.messages.push(this.getDefaultMessage(room))
    this.rooms.push(room)
    this.wss.clients.forEach(client => {
      client.send(JSON.stringify({
        action: WsAction.CREATE_ROOM,
        room: room
      }))
    })
  }

  private broadcast(_data: any) {

    let room = this.rooms.find(room => room.uuid === _data.roomUuid)
    if (!room)
      this.rooms.forEach(room => {
        room.messages.push(_data.message)
      })
    else {
      room.messages.push(_data.message)
    }
    this.wss.clients.forEach(client => {
      client.send(JSON.stringify(_data))
    })
  }
}

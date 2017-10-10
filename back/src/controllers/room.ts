import { AppController } from './_controller';
import { RoomAction } from '../../../shared/RoomAction';
import * as WebSocket from 'ws';
import * as uuid from 'uuid';
import { AppWebSocket } from '../server';

export class RoomController implements AppController {

  private _rooms = new Array()

  get rooms() {
    return this._rooms
  }

  constructor(private wss: WebSocket.Server) {

    this._rooms.push({
      uuid: uuid.v4(),
      index: 0,
      messages: new Array()
    })
    this._rooms[0].messages.push(this.getDefaultMessage(this._rooms[0]))
  }

  onMessage(ws: AppWebSocket, _data: any) {

    switch (_data.action) {
      case RoomAction.CREATE_ROOM:
        this.createRoom();
        break;
      case RoomAction.CREATE_PRIVATE_ROOM:
        this.createPrivateRoom(ws, _data);
        break;
      case RoomAction.BROADCAST:
        this.broadcast(_data);
        break;
    }
  }

  sendRooms(ws: AppWebSocket) {

    ws.send(JSON.stringify({
      action: 0,
      rooms: this._rooms
    }))
  }

  private createRoom() {

    let room = {
      uuid: uuid.v4(),
      index: this._rooms.length,
      messages: new Array()
    }
    room.messages.push(this.getDefaultMessage(room))
    this._rooms.push(room)
    this.wss.clients.forEach(client => {
      client.send(JSON.stringify({
        action: RoomAction.CREATE_ROOM,
        room: room
      }))
    })
  }

  private createPrivateRoom(ws: AppWebSocket, data: any) {

    let room = {
      uuid: uuid.v4(),
      private: true,
      index: this._rooms.length,
      messages: new Array()
    }
    room.messages.push(this.getDefaultMessage(room))
    this.wss.clients.forEach((client: AppWebSocket) => {
      if (data.userUuids.includes(client.uuid)) {
        client.send(JSON.stringify({
          action: RoomAction.CREATE_ROOM,
          room: room
        }))
      }
    })
  }

  private broadcast(data: any) {

    let room = this._rooms.find(room => room.uuid === data.roomUuid)
    if (!room)
      this._rooms.forEach(room => {
        room.messages.push(data.message)
      })
    else {
      room.messages.push(data.message)
    }
    this.wss.clients.forEach(client => {
      client.send(JSON.stringify(data))
    })
  }

  private getDefaultMessage = (room: any) => {
    return {
      date: new Date(),
      text: `Bienvenue dans la Room #${room.index}`,
      user: {
        name: 'Hush.io'
      }
    }
  }
}

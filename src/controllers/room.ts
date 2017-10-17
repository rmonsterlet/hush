import { AppController } from './_controller'
import { RoomAction } from '../shared/RoomAction'
import * as WebSocket from 'ws'
import * as uuid from 'uuid'
import { AppWebSocket } from '../server'
import { RouteType } from '../shared/RouteType'

export class RoomController implements AppController {

  private _rooms = new Array()

  get rooms() {
    return this._rooms
  }

  constructor(private wss: WebSocket.Server) {

    this._rooms.push({
      uuid: uuid.v4(),
      index: 0,
      name: 'Hush.io !',
      messages: new Array()
    })
    this._rooms[0].messages.push(this.getDefaultMessage(this._rooms[0]))
  }

  onMessage(ws: AppWebSocket, _data: any) {

    switch (_data.action) {
      case RoomAction.ADD_ROOM:
        this.createRoom(_data);
        break
      case RoomAction.BROADCAST:
        this.broadcast(_data);
        break
      case RoomAction.REMOVE_ALL:
        this.removeAll(ws)
        break
    }
  }

  sendAll(ws: AppWebSocket) {

    ws.send(JSON.stringify({
      route: RouteType.ROOM,
      action: RoomAction.GET_ROOMS,
      rooms: this._rooms.filter(room => !room.secret)
    }))
  }

  private createRoom(data: any) {

    let room: any = {
      uuid: uuid.v4(),
      index: this._rooms.length,
      name: data.name,
      messages: new Array()
    }
    room.messages.push(this.getDefaultMessage(room))
    room.secret = (data.userUuids && !!data.userUuids.length)

    this.wss.clients.forEach((client: AppWebSocket) => {
      if (!room.secret || data.userUuids.includes(client.uuid)) {
        client.send(JSON.stringify({
          route: RouteType.ROOM,
          action: RoomAction.ADD_ROOM,
          room: room
        }))
      }
    })

    this._rooms.push(room)
  }

  removeAll(ws: AppWebSocket) {
    this._rooms = []
    this.sendAll(ws)
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
      text: `Welcome to ${room.name}`,
      user: {
        name: 'Hush.io'
      }
    }
  }
}

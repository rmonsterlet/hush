import { Injectable } from '@angular/core'
import { RoomAction } from '../../../../../shared/RoomAction';
import { UserAction } from '../../../../../shared/UserAction';
import { RouteType } from '../../../../../shared/RouteType';

@Injectable()
export class WsService {

  _ws
  get ws() {
    return this._ws
  }

  _rooms
  get rooms() {
    return this._rooms
  }

  _users
  get users() {
    return this._users
  }

  constructor() {

    this._ws = new WebSocket('ws://localhost:4100')
    this._ws.onmessage = (event: MessageEvent) => {

      const data = JSON.parse(event.data)

      switch (data.route) {
        case RouteType.ROOM:
          this.onRoomMessage(data)
          break
        case RouteType.USER:
          this.onUserMessage(data)
          break
      }
    }
  }

  private onRoomMessage(data: any) {
    switch (data.action) {
      case RoomAction.GET_ROOMS:
        this._rooms = data.rooms
        break
      case RoomAction.CREATE_ROOM:
        this._rooms.push(data.room)
        break
      case RoomAction.BROADCAST:
        this.broadcast(data);
        break
    }
  }

  private onUserMessage(data: any) {
    switch (data.action) {
      case UserAction.GET_USERS:
        this._users = data.users
        debugger
        break
    }
  }

  private broadcast(data: any) {
    let room = this._rooms.find(room => room.uuid === data.roomUuid)
    if (room) {
      room.messages.push(data.message)
      room.notif = true
    }
  }

  public send(obj) {
    this._ws.send(JSON.stringify(obj))
  }
}

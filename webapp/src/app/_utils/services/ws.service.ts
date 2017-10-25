import * as console from 'console';
import { RouteType } from '../../../../../src/shared/RouteType'
import { RoomAction } from '../../../../../src/shared/RoomAction'
import { UserAction } from '../../../../../src/shared/UserAction'
import { DialogComponent } from '../components/dialog'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'

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

  constructor(private _dialog: MatDialog) {

    const url = location.origin.replace(/^http/, 'ws')
    this._ws = new WebSocket(url)
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
    this._ws.onerror = (event: MessageEvent) => {
      const dialog = this._dialog.open(DialogComponent, {
        disableClose: true,
        data: {
          title: event.type.toUpperCase(),
          icon: {
            code: 'error',
            color: 'warn'
          },
          content: 'Websocket Server disconnected !',
          actions: {
            cancel: 'Fermer'
          }
        }
      })
    }
  }

  private onRoomMessage(data: any) {
    switch (data.action) {
      case RoomAction.GET_ROOMS:
        this._rooms = data.rooms
        break
      case RoomAction.ADD_ROOM:
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
        break
      case UserAction.ADD_USER:
        this._users.push(data.user)
        break
      case UserAction.REMOVE_USER:
        const index = this._users.findIndex(_user => _user.uuid === data.user.uuid)
        if (index >= 0)
          this._users.splice(index, 1)
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

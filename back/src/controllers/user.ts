import { AppWebSocket } from '../server';
import { UserAction } from '../../../shared/UserAction';
import { AppController } from './_controller';
import * as WebSocket from 'ws';
import * as uuid from 'uuid';
import { RouteType } from '../../../shared/RouteType';

export class UserController implements AppController {

    private _users = new Array()

    get users() {
        return this._users
    }

    constructor(private wss: WebSocket.Server) { }

    onMessage(ws: AppWebSocket, data: any) {

        switch (data.action) {
            case UserAction.ADD_USER:
                this.addUser(ws, data.user)
                break
            case UserAction.REMOVE_ALL:
                this.removeAll(ws)
                break
        }
    }

    sendAll(ws: AppWebSocket) {

        ws.send(JSON.stringify({
            route: RouteType.USER,
            action: UserAction.GET_USERS,
            users: this._users
        }))
    }

    addUser(ws: AppWebSocket, user: any) {
        const index = this._users.findIndex(_user => _user.uuid === user.uuid)
        if (index < 0) {
            this.wss.clients.forEach(client => {
                client.send(JSON.stringify({
                    route: RouteType.USER,
                    action: UserAction.ADD_USER,
                    user: user
                }))
            })
            this._users.push(user)
            ws.uuid = user.uuid
        }
    }

    removeUser(uuid: string) {
        const index = this._users.findIndex(_user => _user.uuid === uuid)
        if (index >= 0) {
            this.wss.clients.forEach(client => {
                client.send(JSON.stringify({
                    route: RouteType.USER,
                    action: UserAction.REMOVE_USER,
                    user: this._users[index]
                }))
            })
            this._users.splice(index, 1)
        }
    }

    removeAll(ws: AppWebSocket) {
        this._users = []
        this.sendAll(ws)
    }
}

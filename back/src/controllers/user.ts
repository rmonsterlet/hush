import { AppWebSocket } from '../server';
import { UserAction } from '../../../shared/UserAction';
import { AppController } from './_controller';
import * as WebSocket from 'ws';
import * as uuid from 'uuid';

export class UserController implements AppController {

    private _users = new Array()

    get users() {
        return this._users
    }

    constructor(private wss: WebSocket.Server) { }

    onMessage(ws: AppWebSocket, data: any) {

        switch (data.action) {
            case UserAction.CREATE_USER:
                this.addUser(ws, data.user);
                break;
        }
    }

    addUser(ws: AppWebSocket, user: any) {
        const index = this._users.findIndex(_user => _user.uuid === user.uuid)
        if(index < 0){
            this._users.push(user)
            ws.uuid = user.uuid
        } 
    }

    removeUser(user: any) {
        const index = this._users.findIndex(_user => _user.uuid === user.uuid)
        if(index >= 0)
            this._users.splice(index, 1);
    }
}

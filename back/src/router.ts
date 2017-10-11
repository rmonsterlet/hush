import { RouteType } from '../../shared/RouteType';
import * as WebSocket from 'ws';
import { AppWebSocket } from './server';
import { RoomController } from './controllers/room';
import { UserController } from './controllers/user';

export class AppRouter {

    private _roomController: RoomController
    private _userController: UserController

    constructor(private wss: WebSocket.Server) {
        this._roomController = new RoomController(wss)
        this._userController = new UserController(wss)
    }

    onMessage(ws: AppWebSocket, data: any) {

        switch (data.route) {
            case RouteType.ROOM:
                this._roomController.onMessage(ws, data)
                break
            case RouteType.USER:
                this._userController.onMessage(ws, data)
                break
        }
    }

    sendRooms(ws: AppWebSocket) {
        this._roomController.sendAll(ws)
    }

    sendUsers(ws: AppWebSocket) {
        this._userController.sendAll(ws)
    }

    removeUser(uuid: string) {
        this._userController.removeUser(uuid)
    }
}

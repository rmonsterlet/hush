"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserAction_1 = require("../shared/UserAction");
const RouteType_1 = require("../shared/RouteType");
class UserController {
    constructor(wss) {
        this.wss = wss;
        this._users = new Array();
    }
    get users() {
        return this._users;
    }
    onMessage(ws, data) {
        switch (data.action) {
            case UserAction_1.UserAction.ADD_USER:
                this.addUser(ws, data.user);
                break;
            case UserAction_1.UserAction.REMOVE_ALL:
                this.removeAll(ws);
                break;
        }
    }
    sendAll(ws) {
        ws.send(JSON.stringify({
            route: RouteType_1.RouteType.USER,
            action: UserAction_1.UserAction.GET_USERS,
            users: this._users
        }));
    }
    removeDisconnectedUsers(clients) {
        const clientUuids = Array.from(clients)
            .map((client => client.uuid))
            .filter(uuid => uuid);
        const uuidsToRemove = this._users
            .map(user => user.uuid)
            .filter(userUuid => clientUuids.indexOf(userUuid) < 0);
        uuidsToRemove.forEach(uuidToRemove => this.removeUser(uuidToRemove));
    }
    addUser(ws, user) {
        const index = this._users.findIndex(_user => _user.uuid === user.uuid);
        if (index < 0) {
            this.wss.clients.forEach(client => {
                client.send(JSON.stringify({
                    route: RouteType_1.RouteType.USER,
                    action: UserAction_1.UserAction.ADD_USER,
                    user: user
                }));
            });
            this._users.push(user);
        }
        ws.uuid = user.uuid;
    }
    removeUser(uuid) {
        const index = this._users.findIndex(_user => _user.uuid === uuid);
        if (index >= 0) {
            this.wss.clients.forEach(client => {
                client.send(JSON.stringify({
                    route: RouteType_1.RouteType.USER,
                    action: UserAction_1.UserAction.REMOVE_USER,
                    user: this._users[index]
                }));
            });
            this._users.splice(index, 1);
        }
    }
    removeAll(ws) {
        this._users = [];
        this.sendAll(ws);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.js.map
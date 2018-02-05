"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomAction_1 = require("../shared/RoomAction");
const uuid = require("uuid");
const RouteType_1 = require("../shared/RouteType");
class RoomController {
    constructor(wss) {
        this.wss = wss;
        this._rooms = new Array();
        this.getDefaultMessage = (room) => {
            return {
                date: new Date(),
                text: 'Welcome to ' + room.name + (room.secret ? ' (private)' : ' (public)'),
                user: {
                    name: 'Hush.io'
                }
            };
        };
        this._rooms.push({
            uuid: uuid.v4(),
            index: 0,
            name: 'Hush.io !',
            messages: new Array()
        });
        this._rooms[0].messages.push(this.getDefaultMessage(this._rooms[0]));
    }
    get rooms() {
        return this._rooms;
    }
    onMessage(ws, _data) {
        switch (_data.action) {
            case RoomAction_1.RoomAction.ADD_ROOM:
                this.createRoom(_data);
                break;
            case RoomAction_1.RoomAction.BROADCAST:
                this.broadcast(_data);
                break;
            case RoomAction_1.RoomAction.REMOVE_ALL:
                this.removeAll(ws);
                break;
        }
    }
    sendAll(ws) {
        ws.send(JSON.stringify({
            route: RouteType_1.RouteType.ROOM,
            action: RoomAction_1.RoomAction.GET_ROOMS,
            rooms: this._rooms.filter(room => !room.secret)
        }));
    }
    createRoom(data) {
        let room = {
            uuid: uuid.v4(),
            index: this._rooms.length,
            name: data.name,
            messages: new Array()
        };
        room.secret = (data.userUuids && !!data.userUuids.length);
        room.messages.push(this.getDefaultMessage(room));
        this.wss.clients.forEach(client => {
            if (!room.secret || data.userUuids.includes(client.uuid)) {
                client.send(JSON.stringify({
                    route: RouteType_1.RouteType.ROOM,
                    action: RoomAction_1.RoomAction.ADD_ROOM,
                    room: room
                }));
            }
        });
        this._rooms.push(room);
    }
    removeAll(ws) {
        this._rooms = [];
        this.sendAll(ws);
    }
    broadcast(data) {
        let room = this._rooms.find(room => room.uuid === data.roomUuid);
        if (!room)
            this._rooms.forEach(room => {
                room.messages.push(data.message);
            });
        else {
            room.messages.push(data.message);
        }
        this.wss.clients.forEach(client => {
            client.send(JSON.stringify(data));
        });
    }
}
exports.RoomController = RoomController;
//# sourceMappingURL=room.js.map
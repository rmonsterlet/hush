"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RouteType_1 = require("./shared/RouteType");
const room_1 = require("./controllers/room");
const user_1 = require("./controllers/user");
class AppRouter {
    constructor(wss) {
        this.wss = wss;
        this._roomController = new room_1.RoomController(wss);
        this._userController = new user_1.UserController(wss);
    }
    onMessage(ws, data) {
        switch (data.route) {
            case RouteType_1.RouteType.ROOM:
                this._roomController.onMessage(ws, data);
                break;
            case RouteType_1.RouteType.USER:
                this._userController.onMessage(ws, data);
                break;
        }
    }
    sendRooms(ws) {
        this._roomController.sendAll(ws);
    }
    sendUsers(ws) {
        this._userController.sendAll(ws);
    }
    removeDisconnectedUsers(clients) {
        this._userController.removeDisconnectedUsers(clients);
    }
}
exports.AppRouter = AppRouter;
//# sourceMappingURL=router.js.map
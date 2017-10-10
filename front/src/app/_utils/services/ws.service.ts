import { Injectable } from '@angular/core'
import { RoomAction } from '../../../../../shared/RoomAction';

@Injectable()
export class WsService {

    _ws
    get ws(){
        return this._ws
    }

    _rooms
    get rooms(){
        return this._rooms
    }

    constructor() {

        this._ws = new WebSocket('ws://localhost:4100')
        this._ws.onmessage = (event: MessageEvent) => {

            const _data = JSON.parse(event.data)
            switch (_data.action) {

                case RoomAction.UPDATE_ROOMS:
                    this._rooms = _data.rooms
                    break
                case RoomAction.CREATE_ROOM:
                    this._rooms.push(_data.room)
                    break
                case RoomAction.BROADCAST:
                    this.broadcast(_data);
                    break
            }
        }
    }

    private broadcast(_data: any) {
        let room = this._rooms.find(room => room.uuid === _data.roomUuid)
        if (room){
            room.messages.push(_data.message)
            if (room.index !== _data.selectedIndex)
                room.notif = true
        }
    }

    public send(obj){
        this._ws.send(JSON.stringify(obj))
    }
}

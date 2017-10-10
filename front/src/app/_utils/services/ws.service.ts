import { Injectable } from '@angular/core'
import { WsAction } from '../../../../../shared/WsAction';

@Injectable()
export class WsService {

    ws

    _rooms
    get rooms(){
        return this._rooms
    }

    constructor() {

        this.ws = new WebSocket('ws://localhost:4100')
        this.ws.onmessage = (event: MessageEvent) => {

            const _data = JSON.parse(event.data)
            switch (_data.action) {

                case WsAction.UPDATE_ROOMS:
                    this._rooms = _data.rooms
                    break
                case WsAction.CREATE_ROOM:
                    this._rooms.push(_data.room)
                    break
                case WsAction.BROADCAST:
                    this.broadcast(_data);
                    break
            }
        }
    }

    private broadcast(_data: any) {
        let room = this._rooms.find(room => room.uuid === _data.roomUuid)
        if (!room)
            this._rooms.forEach(room => {
                room.messages.push(_data.message)
                if (room.index !== _data.selectedIndex)
                    room.notif = true
            })
        else {
            room.messages.push(_data.message)
            if (room.index !== _data.selectedIndex)
                room.notif = true
        }
    }

    public send(obj){
        this.ws.send(JSON.stringify(obj))
    }
}

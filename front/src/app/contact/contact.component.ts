import { WsAction } from '../../../../shared/WsAction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  user

  ws
  message
  datas = []

  rooms: any = []

  selectedIndex = 0

  constructor(private _appService: AppService) { }

  ngOnInit() {

    this.user = this._appService.user

    this.ws = new WebSocket('ws://localhost:4100')
    this.ws.onmessage = (event: MessageEvent) => {
      
      const _data = JSON.parse(event.data)
      switch (_data.action) {
       
        case WsAction.UPDATE_ROOMS:
          this.rooms = _data.rooms
          break
        case WsAction.CREATE_ROOM:
          this.rooms.push(_data.room)
          break
        case WsAction.BROADCAST:
          this.broadcast(_data);
          break
      }
    }
  }

  onSelectedIndexChange(){
    this.rooms.find(room => room.index === this.selectedIndex).notif = false
  }

  onSendClick() {
    if (!this.message || !this.message.trim().length)
      return

    this.ws.send(JSON.stringify({
      action: WsAction.BROADCAST,
      roomUuid: this.rooms.find(room => room.index === this.selectedIndex).uuid,
      message: {
        user: this.user,
        date: new Date(),
        text: this.message
      }
    }))
  }

  onCreateRoomClick() {
    this.ws.send(JSON.stringify({
      action: WsAction.CREATE_ROOM
    }))
  }

  private broadcast(_data: any) {
    let room = this.rooms.find(room => room.uuid === _data.roomUuid)
    if (!room)
      this.rooms.forEach(room => {
        room.messages.push(_data.message)
        if(room.index !== this.selectedIndex) 
          room.notif = true
      })
    else {
      room.messages.push(_data.message)
      debugger
      if(room.index !== this.selectedIndex) 
        room.notif = true
    }
  }
}

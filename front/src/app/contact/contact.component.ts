import { WsAction } from '../../../../shared/WsAction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'app/app.service';
import { WsService } from 'app/_utils';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [
    WsService
  ]
})
export class ContactComponent implements OnInit {

  user
  room
  message
  selectedIndex = 0

  constructor(
    private _appService: AppService,
    public wsService: WsService
  ) { }

  ngOnInit() {

    this.user = this._appService.user
  }

  onSelectedIndexChange(){
    const room = this.wsService.rooms.find(room => room.index === this.selectedIndex)
    room.notif = false
    this.room = room
  }

  onSendClick() {
    if (!this.message || !this.message.trim().length)
      return

    this.wsService.send({
      action: WsAction.BROADCAST,
      roomUuid: this.wsService.rooms.find(room => room.index === this.selectedIndex).uuid,
      selectedIndex: this.selectedIndex,
      message: {
        user: this.user,
        date: new Date(),
        text: this.message
      }
    })
  }

  onCreateRoomClick() {
    this.wsService.send({
      action: WsAction.CREATE_ROOM
    })
  }

}

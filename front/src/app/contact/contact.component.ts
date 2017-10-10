import { RouteType } from '../../../../shared/RouteType';
import { RoomAction } from '../../../../shared/RoomAction';
import { UserAction } from '../../../../shared/UserAction';
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

    this.wsService.ws.onopen = (event: MessageEvent) => {
      this.wsService.send({
        route: RouteType.USER_ACTION,
        action: UserAction.CREATE_USER,
        user: this.user
      })
    }
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
      route: RouteType.ROOM_ACTION,
      action: RoomAction.BROADCAST,
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
      route: RouteType.ROOM_ACTION,
      action: RoomAction.CREATE_ROOM
    })
  }

  onCreatePrivateRoomClick(user){
    this.wsService.send({
      route: RouteType.ROOM_ACTION,
      action: RoomAction.CREATE_PRIVATE_ROOM,
      userUuids: [
        this.user.uuid,
        user.uuid
      ]
    })
  }
}

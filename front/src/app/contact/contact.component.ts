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
  message
  
  selectedIndex = 0
  selectedRoom

  constructor(
    private _appService: AppService,
    public wsService: WsService
  ) { }

  ngOnInit() {

    this.user = this._appService.user

    this.wsService.ws.onopen = (event: MessageEvent) => {
      this.wsService.send({
        route: RouteType.USER,
        action: UserAction.CREATE_USER,
        user: this.user
      })
    }
  }

  onSelectedIndexChange() {

    if(this.selectedRoom)
      this.selectedRoom.notif = false

    const room = this.wsService.rooms.find(room => room.index === this.selectedIndex)
    room.notif = false
    this.selectedRoom = room
  }

  onSendClick() {
    if (!this.message || !this.message.trim().length)
      return

    this.wsService.send({
      route: RouteType.ROOM,
      action: RoomAction.BROADCAST,
      roomUuid: this.selectedRoom.uuid,
      message: {
        user: this.user,
        date: new Date(),
        text: this.message
      }
    })
  }

  onCreateRoomClick(user?) {

    let data: any = {
      route: RouteType.ROOM,
      action: RoomAction.CREATE_ROOM,
    }

    if (user)
      data.userUuids = [
        this.user.uuid,
        user.uuid
      ]

    this.wsService.send(data)
  }
}

import { RouteType } from '../../../../shared/RouteType';
import { RoomAction } from '../../../../shared/RoomAction';
import { UserAction } from '../../../../shared/UserAction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'app/app.service';
import { WsService } from 'app/_utils';
import { RoomComponent } from 'app/dialog/room/room.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    WsService
  ]
})
export class MainComponent implements OnInit {

  user
  message

  selectedIndex = 0
  selectedRoom

  constructor(
    public appService: AppService,
    public wsService: WsService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {

    this.user = this.appService.user

    if (!this.user.uuid && localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'))

    if (this.user.uuid)
      this.wsService.ws.onopen = (event: MessageEvent) => {
        this.wsService.send({
          route: RouteType.USER,
          action: UserAction.ADD_USER,
          user: this.user
        })
      }
  }

  onSelectedIndexChange() {

    if (this.selectedRoom)
      this.selectedRoom.notif = false

    const room = this.wsService.rooms.find(room => room.index === this.selectedIndex)
    if (room) {
      room.notif = false
      this.selectedRoom = room
    }
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

    this.message = null
  }

  onCreateRoomClick(user) {
    
    const dialog = this._dialog.open(RoomComponent, {
      data: {
        author: this.appService.user,
        user: user
      }
    })
  }
}

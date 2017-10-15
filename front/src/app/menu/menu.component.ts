import { RoomAction } from '../../../../shared/RoomAction';
import { RouteType } from '../../../../shared/RouteType';
import { Component, Input, OnInit } from '@angular/core';
import { WsService } from 'app/_utils';
import { MatDialog } from '@angular/material';
import { RoomComponent } from 'app/dialog/room/room.component';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [
    WsService
  ]
})
export class MenuComponent implements OnInit {

  @Input('user') user

  constructor(
    public wsService: WsService,
    public appService: AppService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {

    if(!this.user.uuid && localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'))
  }

  onCreateRoomClick(user?) {

    const _data: any = {
      author: this.appService.user,
      user: user
    }

    const dialog = this._dialog.open(RoomComponent, {
      data: _data
    })
  }

}

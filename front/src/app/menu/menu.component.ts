import { RoomAction } from '../../../../shared/RoomAction';
import { RouteType } from '../../../../shared/RouteType';
import { Component, Input, OnInit } from '@angular/core';
import { WsService } from 'app/_utils';
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
    private _appService: AppService,
    public wsService: WsService
  ) { }

  ngOnInit() {

    if(!this.user.uuid && localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'))
  }

  onCreateRoomClick(user?) {

    let data: any = {
      route: RouteType.ROOM,
      action: RoomAction.ADD_ROOM,
    }

    if (user)
      data.userUuids = [
        this.user.uuid,
        user.uuid
      ]

    this.wsService.send(data)
  }

}

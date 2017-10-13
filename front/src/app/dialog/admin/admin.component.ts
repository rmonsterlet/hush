import { Component, Inject, OnInit, Optional } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as sha256 from 'sha256'
import { WsService } from 'app/_utils';
import { RouteType } from '../../../../../shared/RouteType';
import { RoomAction } from '../../../../../shared/RoomAction';
import { UserAction } from '../../../../../shared/UserAction';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  password

  admin: boolean

  constructor(
    public dialog: MatDialogRef<AdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _wsService: WsService
  ) {}

  ngOnInit() {
  }

  onPasswordChange(){
    this.admin = sha256.x2(this.password) === 'b2e2ab218c85c333e3d0c5a5500ed16411cdc7fa653ccf6287ef8c219dfe8886'
  }

  onClearRoomsClick(){
    this._wsService.send({
      route: RouteType.ROOM,
      action: RoomAction.REMOVE_ALL,
    })
  }

  onClearUsersClick(){
    this._wsService.send({
      route: RouteType.USER,
      action: UserAction.REMOVE_ALL,
    })
  }

}

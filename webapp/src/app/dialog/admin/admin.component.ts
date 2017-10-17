import { Component, Inject, OnInit, Optional } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import * as sha256 from 'sha256'
import { WsService } from 'app/_utils';
import { RouteType } from '../../../../../src/shared/RouteType';
import { RoomAction } from '../../../../../src/shared/RoomAction';
import { UserAction } from '../../../../../src/shared/UserAction';

@Component({
  selector: 'app-nimda',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class NimdaComponent implements OnInit {

  title = 'Hey you !'
  input

  following: boolean

  constructor(
    public dialog: MatDialogRef<NimdaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _wsService: WsService
  ) {}

  ngOnInit() {
  }

  onInputChange(){
    const struct = ['b2e2a','b218c85c3','33e3d0c5a5','500ed16411','cdc7fa653c','cf6287ef8c','219dfe8886']
    this.following = sha256.x2(this.input) === struct.join('')
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

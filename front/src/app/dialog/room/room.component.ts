import { Component, Inject, OnInit, Optional } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WsService } from 'app/_utils'
import { RouteType } from '../../../../../shared/RouteType';
import { RoomAction } from '../../../../../shared/RoomAction';
import { AppService } from 'app/app.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  title = 'Créer une room'
  roomName

  constructor(
    public dialog: MatDialogRef<RoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _appService: AppService,
    private _wsService: WsService
  ) { }

  ngOnInit() {
  }

  onCreateRoomClick() {

    let data: any = {
      route: RouteType.ROOM,
      action: RoomAction.ADD_ROOM,
      roomName: this.roomName
    }

    if (this.data.author && this.data.user)
      data.userUuids = [
        this.data.author.uuid,
        this.data.user.uuid
      ]

    this._wsService.send(data)
    this.dialog.close(true)
  }
}

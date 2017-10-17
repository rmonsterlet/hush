import { Component, Inject, OnInit, Optional } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WsService } from 'app/_utils'
import { RouteType } from '../../../../../src/shared/RouteType';
import { RoomAction } from '../../../../../src/shared/RoomAction';
import { AppService } from 'app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  title = 'Create a room'
  name

  roomForm: FormGroup

  constructor(
    public dialog: MatDialogRef<RoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _appService: AppService,
    private _wsService: WsService
  ) { }

  ngOnInit() {

    this.roomForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.maxLength(32)
      ])
    })
  }

  onCreateRoomClick() {

    let data: any = {
      route: RouteType.ROOM,
      action: RoomAction.ADD_ROOM,
      name: this.name
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

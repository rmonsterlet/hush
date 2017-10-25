import { RoomAction } from '../../../../src/shared/RoomAction';
import { RouteType } from '../../../../src/shared/RouteType';
import { Component, Input, OnInit } from '@angular/core';
import { WsService } from 'app/_utils';
import { MatDialog } from '@angular/material';
import { RoomComponent } from 'app/dialog/room/room.component';
import { AppService } from 'app/app.service';
import { FormGroup, FormControl } from '@angular/forms';

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

  filterIni = {
    woman: true,
    man: true,
    age: {
      min: 0,
      max: 100
    },
    sameCountry: false,
    sameCity: false
  }
  filter

  filterForm: FormGroup

  constructor(
    public wsService: WsService,
    public appService: AppService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {

    if (!this.user.uuid && localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'))

    this.filterForm = new FormGroup({
      'woman': new FormControl(''),
      'man': new FormControl(''),
      'sameCountry': new FormControl(''),
      'sameCity': new FormControl(''),
      'ageMin': new FormControl(''),
      'ageMax': new FormControl('')
    })
    this.filter = JSON.parse(JSON.stringify(this.filterIni))
  }

  onCreateRoomClick(user?) {

    if (!user) {
      const dialog = this._dialog.open(RoomComponent, {
        data: {
          userUuids: []
        }
      })
    }
    else {
      let data: any = {
        route: RouteType.ROOM,
        action: RoomAction.ADD_ROOM,
        name: this.appService.user.name + ' & ' + user.name,
        userUuids: [
          this.appService.user.uuid,
          user.uuid
        ]
      }
      this.wsService.send(data)
    }
  }

  onClearClick() {
    this.filter = JSON.parse(JSON.stringify(this.filterIni))
  }
}

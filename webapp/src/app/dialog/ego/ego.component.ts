import { Component, Inject, OnInit, Optional } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { WsService } from 'app/_utils'
import { RouteType } from '../../../../../src/shared/RouteType';
import { RoomAction } from '../../../../../src/shared/RoomAction';
import { AppService } from 'app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ego-dialog',
  templateUrl: './ego.component.html',
  styleUrls: ['./ego.component.scss']
})
export class EgoDialogComponent implements OnInit {

  images = [
    { url: '/assets/ego/slides/slide3.png' },
    { url: '/assets/ego/slides/slide3.png' },
    { url: '/assets/ego/slides/slide3.png' }
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _appService: AppService,
    private _wsService: WsService
  ) { }

  ngOnInit() {

  }
}

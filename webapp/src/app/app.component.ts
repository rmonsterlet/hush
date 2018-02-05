import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { AppService } from './app.service'
import { Priorite, Statut } from './_types'
import * as sha256 from 'sha256'
import { MatDialog } from '@angular/material';
import { NimdaComponent } from 'app/dialog/admin/admin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AppService
  ]
})
export class AppComponent implements OnInit {

  title = 'Hush.io'
  theme = {}
  search
  sideNavMode = 'side'

  constructor(
    public appService: AppService,
    public router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {

    if (!localStorage.getItem('user'))
      this.router.navigate(['login'])
    else
      this.appService.user = JSON.parse(localStorage.getItem('user'))

    this.sideNavMode = typeof window.orientation === 'undefined' ? 'side' : 'over'

    /*this._appService.getConf().then(data => {
      this._appService.conf = data
      this.initAgent()
    })*/
  }

  setSideNavMode() {
    if (typeof window.orientation !== 'undefined')
      this.sideNavMode = 'over'
    else
      this.sideNavMode = window.innerWidth < 600 ? 'over' : 'side'
  }

  isNimda() {
    if (!this.appService.user.name)
      return

    const struct = ['b546', '11b2bbdc77', 'b7bf991028', 'd4d549c838', 'd62df68acb', 'a52368d672', '763b216bb3']
    return sha256.x2(this.appService.user.name.toLowerCase()) === struct.join('')
  }

  onNimdaClick() {

    const dialog = this._dialog.open(NimdaComponent, {
      data: {
      }
    })
  }

  onOpenCvClick(){
    window.open('/assets/pdf/CV_RMONSTERLET.pdf')
  }

  up() {
    window.scrollTo(0, 0)
  }

}

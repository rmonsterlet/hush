import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { AppService } from './app.service'
import { Priorite, Statut } from './_types'
import * as sha256 from 'sha256'
import { MatDialog } from '@angular/material';
import { AdminComponent } from 'app/dialog/admin/admin.component';

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
  sideNavMode

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

    this.sideNavMode = (window.innerWidth < 800 && window.innerHeight < 600) ? 'over' : 'side'

    /*this._appService.getConf().then(data => {
      this._appService.conf = data
      this.initAgent()
    })*/
  }

  isAdmin() {
    return sha256.x2(this.appService.user.name.toLowerCase()) === 'b54611b2bbdc77b7bf991028d4d549c838d62df68acba52368d672763b216bb3'
  }

  onAdminClick() {

    const dialog = this._dialog.open(AdminComponent, {
      data: {
      }
    })
  }

  up() {
    window.scrollTo(0, 0)
  }

}

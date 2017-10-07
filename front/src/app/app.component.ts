import { Component, OnInit, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { AppService } from './app.service'
import { Priorite, Statut } from './_types'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AppService
  ]
})
export class AppComponent implements OnInit {

  connected = false
  title = 'Hush.io'
  username = 'SE CONNECTER'
  search

  constructor(
    private _appService: AppService,
    private _router: Router
  ) { }

  ngOnInit() {

    /*this._appService.getConf().then(data => {
      this._appService.conf = data
      this.initAgent()
    })*/
  }

  up() {
    window.scrollTo(0, 0)
  }

}

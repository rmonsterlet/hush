import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core'
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

  title = 'Hush.io'
  theme = {}
  search

  constructor(
    public appService: AppService,
    public router: Router
  ) { }

  ngOnInit() {

    if(!localStorage.getItem('user'))
      this.router.navigate(['login'])
    else
      this.appService.user = JSON.parse(localStorage.getItem('user'))
    
    /*this._appService.getConf().then(data => {
      this._appService.conf = data
      this.initAgent()
    })*/
  }

  up() {
    window.scrollTo(0, 0)
  }

}

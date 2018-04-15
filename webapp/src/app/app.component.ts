import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { AppService } from './app.service'
import { Priorite, Statut } from './_types'
import * as sha256 from 'sha256'
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase'
import { AppUtilsService } from './_utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AppService,
    AppUtilsService
  ]
})
export class AppComponent implements OnInit {

  title = 'Hush.io'
  theme = {}
  search
  sideNavMode = 'side'

  user = {}

  constructor(
    public appService: AppService,
    public router: Router,
    private _appUtilsService: AppUtilsService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {

    /*
    if (!localStorage.getItem('user'))
      console.log('login modal please')
      //this.router.navigate(['login'])
    else
      this.appService.user = JSON.parse(localStorage.getItem('user'))
    */

    debugger

    let themes = this._appUtilsService.getThemeNames()
    this.appService.session.theme = themes[Math.floor(Math.random() * Math.floor(themes.length))].label.toLowerCase().split(' ').join('-')

    //this.login()
    this.sideNavMode = typeof window.orientation === 'undefined' ? 'side' : 'over'
  }

  login() {

    return firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.appService.user = user
      } else {
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(obj => this.appService.user = obj.user)
      }
    })
  }

  setSideNavMode() {
    if (typeof window.orientation !== 'undefined')
      this.sideNavMode = 'over'
    else
      this.sideNavMode = window.innerWidth < 600 ? 'over' : 'side'
  }

  onOpenCvClick() {
    window.open('/assets/pdf/CV_RMONSTERLET.pdf')
  }

  onOpenGithubClick() {
    window.open('https://github.com/rmonsterlet/hush')
  }

  up() {
    window.scrollTo(0, 0)
  }
}

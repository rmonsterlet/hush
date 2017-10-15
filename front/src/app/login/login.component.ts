import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core'
import { LoginService } from './login.service'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, GeoCodingService } from 'app/_utils';
import { createClient, GoogleMapsClient } from '@google/maps'
import { Router } from '@angular/router';
import * as uuid from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    LoginService,
    AppUtilsService,
    GeoCodingService
  ]
})
export class LoginComponent implements OnInit {

  years
  options = []
  colors
  themes

  loginForm: FormGroup

  constructor(
    public appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _geoCodingService: GeoCodingService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'sex': new FormControl('F'),
      'name': new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
      'age': new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]),
      'description': new FormControl(''),
      'city': new FormControl(''),
      'theme': new FormControl(''),
      'color': new FormControl('')
    });

    this.themes = this._appUtilsService.getThemeNames()
    this.colors = this._appUtilsService.getColorNames()
  }

  onCityChange() {

    /*
    TODO
    if(!this.user.city || this.user.city.length < 3) 
      return

    this._geoCodingService.geocodeAddress(this.user.city).then(data => {
      debugger
    })*/
  }

  connect() {

    //if(!this.user.uuid)
    this.appService.user.uuid = uuid.v4()

    localStorage.setItem('user', JSON.stringify(this.appService.user))
    this._router.navigate(['/'])
  }

}

import { Component, OnInit } from '@angular/core'
import { LoginService } from './login.service'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, GeoCodingService } from 'app/_utils';
import { createClient, GoogleMapsClient } from '@google/maps'
import { Router } from '@angular/router';
import * as uuid from 'uuid'

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

  user: any = {}

  years
  options = []
  colors
  themes = [
    {
      value: 'undefined',
      label: ''
    },
    {
      color: '#F44336',
      label: 'Red'
    },
    {
      color: '#9C27B0',
      label: 'Purple'
    },
    {
      color: '#673AB7',
      label: 'Deep Purple'
    },
    {
      color: '#3F51B5',
      label: 'Indigo'
    },
    {
      color: '#2196F3',
      label: 'Blue'
    },
    {
      color: '#03A9F4',
      label: 'Light Blue'
    },
    {
      color: '#00BCD4',
      label: 'Cyan'
    },
    {
      color: '#009688',
      label: 'Teal'
    },
    {
      color: '#4CAF50',
      label: 'Green'
    },
    {
      color: '#8BC34A',
      label: 'Light Green'
    },
    {
      color: '#CDDC39',
      label: 'Lime'
    },
    {
      color: '#FFEB3B',
      label: 'Yellow'
    },
    {
      color: '#FFC107',
      label: 'Amber'
    },
    {
      color: '#FF9800',
      label: 'Orange'
    },
    {
      color: '#FF5722',
      label: 'Deep Orange'
    },
    {
      color: '#9E9E9E',
      label: 'Grey'
    },
    {
      color: '#607D8B',
      label: 'Blue Grey'
    }
  ]

  constructor(
    private _appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _geoCodingService: GeoCodingService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('user'))
      this.user = JSON.parse(localStorage.getItem('user'))

    const date = new Date()
    this.years = Array.from(new Array(125), (val, index) => date.getFullYear() - index)

    this.colors = this._appUtilsService.getColorNames()
  }

  onCityChange(){

    /*
    TODO
    if(!this.user.city || this.user.city.length < 3) 
      return

    this._geoCodingService.geocodeAddress(this.user.city).then(data => {
      debugger
    })*/
  }

  connect(){

    //if(!this.user.uuid)
    this.user.uuid = uuid.v4()

    this._appService.user = this.user
    localStorage.setItem('user', JSON.stringify(this.user))
    this._router.navigate(['main'])
  }

}

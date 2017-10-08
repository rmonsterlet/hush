import { Component, OnInit } from '@angular/core'
import { PreferencesService } from './preferences.service'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, GeoCodingService } from 'app/_utils';
import { createClient, GoogleMapsClient } from '@google/maps'
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  providers: [
    PreferencesService,
    AppUtilsService,
    GeoCodingService
  ]
})
export class PreferencesComponent implements OnInit {

  user: any = {
    sex: 'F'
  }

  years
  options = []
  colors

  constructor(
    private _appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _geoCodingService: GeoCodingService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.user = this._appService.user

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
    this._appService.user = this.user   
    this._router.navigate(['contact'])
  }

}

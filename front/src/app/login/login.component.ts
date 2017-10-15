import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core'
import { LoginService } from './login.service'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, GeoCodingService, HttpDefaultService } from 'app/_utils';
import { createClient, GoogleMapsClient } from '@google/maps'
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import 'rxjs/add/operator/startWith';

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

  colors
  themes

  countries
  filteredCountries

  loginForm: FormGroup

  constructor(
    public appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _geoCodingService: GeoCodingService,
    private _httpService: HttpDefaultService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'sex': new FormControl(''),
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
      'country': new FormControl(''),
      'city': new FormControl({ value: '', disabled: true }),
      'theme': new FormControl(''),
      'color': new FormControl('')
    });

    this.themes = this._appUtilsService.getThemeNames()
    this.colors = this._appUtilsService.getColorNames()

    this._httpService.get('https://restcountries.eu/rest/v2/all').then(data => {
      this.appService.session.countries = data
      this.filteredCountries = this.loginForm.controls.country.valueChanges
        .startWith(null)
        .map(value => value ? this.filterCountry(value) : this.appService.session.countries.slice())
    })
  }

  filterCountry(value) {
    if (this.appService.session.countries)
      return this.appService.session.countries.filter(country => country.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
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

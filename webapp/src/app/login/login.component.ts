import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'
import { AppUtilsService, HttpDefaultService } from 'app/_utils';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    AppUtilsService
  ]
})
export class LoginComponent implements OnInit {

  colors
  themes

  countries
  filteredCountries

  options

  loginForm: FormGroup

  constructor(
    public appService: AppService,
    private _appUtilsService: AppUtilsService,
    private _httpService: HttpDefaultService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    debugger

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
    })

    this.themes = this._appUtilsService.getThemeNames()
    this.colors = this._appUtilsService.getColorNames()
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

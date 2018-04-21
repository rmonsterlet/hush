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

    if (localStorage.getItem('user'))
      this.appService.user = JSON.parse(localStorage.getItem('user'))

    this.loginForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
      ]),
      'theme': new FormControl(''),
    })

    this.themes = this._appUtilsService.getThemeNames()
  }

  filterCountry(value) {
    if (this.appService.session.countries)
      return this.appService.session.countries.filter(country => country.name.toLowerCase().indexOf(value.toLowerCase()) === 0)
  }

  connect() {

    this.appService.user.uuid = uuid.v4()

    localStorage.setItem('user', JSON.stringify(this.appService.user))
    this._router.navigate(['/main'])
  }

  carabistouille(){
    window.open('https://amen-cf01b.firebaseapp.com/')
  }

}

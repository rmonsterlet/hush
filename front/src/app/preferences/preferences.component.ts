import { Component, OnInit } from '@angular/core'
import { PreferencesService } from './preferences.service'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  providers: [
    PreferencesService
  ]
})
export class PreferencesComponent implements OnInit {

  user: any = {}

  years
  options = []

  constructor(private _appService: AppService) { }

  ngOnInit(): void {
    const date = new Date()
    this.years = Array.from(new Array(125), (val, index) => date.getFullYear() - index)
  }

}

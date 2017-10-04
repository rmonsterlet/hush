import { Component, OnInit } from '@angular/core'
import { AppService } from '../app.service'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  data: {
    nom?: string,
    prenom?: string,
    login?: string,
    role?: string
  } = {}
  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.data = this._appService.agent
  }
}

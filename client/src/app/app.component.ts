import { Component, OnInit, EventEmitter } from '@angular/core'
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

  connected = false
  title = 'Hush'
  username = 'SE CONNECTER'

  constructor(
    private _appService: AppService,
    private _router: Router
  ) { }

  ngOnInit() {

    /*this._appService.getConf().then(data => {
      this._appService.conf = data
      this.initAgent()
    })*/
  }

  initAgent() {
    this._appService.getHabilitations().then(data => {
      this._appService.agent = data

      if (!data.login) {
        this.connect()
      }
      if (data.prenom && data.nom) {
        this.connected = true
        this.username = data.prenom + ' ' + data.nom
        this._appService.eventEmitter.emit({ option: 'onAgentLoaded' })
        this.initApp()
      }
    })

  }

  initApp() {

    this._appService.getPriorites().then((priorites: Priorite[]) => {
      this._appService.session.priorites = priorites
      this._appService.eventEmitter.emit({ option: 'onPrioritesLoaded' })
    })

    this._appService.getStatuts().then((statuts: Statut[]) => {
      this._appService.session.statuts = statuts
      this._appService.eventEmitter.emit({ option: 'onStatutsLoaded' })
    })

    this._appService.getMotifsAnnulation().then((motifsAnnulation: string[]) => {
      this._appService.session.motifsAnnulation = motifsAnnulation
    })

    const checkInit = () => {
      const session = this._appService.session
      if (!session.statuts || !session.priorites) {
        window.setTimeout(checkInit, 100)
      }
      else {
        this._appService.session.appReady = true
        this._appService.eventEmitter.emit({ option: 'onAppReady' })
      }
    }
    checkInit()
  }

  up() {
    window.scrollTo(0, 0)
  }

  connect() {
    this._appService.connect()
  }

  disconnect() {
    this._appService.disconnect().then(res => {
      this.connected = false
      this.username = 'Anonyme'
      this._router.navigate(['logout'])
    })
  }
}

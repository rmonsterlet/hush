import { Injectable, EventEmitter } from '@angular/core'
import { HttpDefaultService } from './_utils'
import { Statut, Priorite, ShortDemande } from './_types'
import { AppConfig } from './app.config'

@Injectable()
export class AppService {

  private _agent: {
    authentifie?: boolean,
    login?: string,
    name?: string,
    nom?: string,
    preferences: {
      id?: number
      nbLigneParPage?: number,
      status?: string
    }
    prenom?: string,
    role?: string
  } = {
    preferences: {}
  }
  set agent(data) {
    this._agent = data
  }
  get agent() {
    return this._agent
  }

  private _conf: any
  set conf(conf) {
    this._conf = conf
  }
  get conf() {
    return this._conf
  }

  private _session: {
    appReady?: boolean,
    preferences: {
      status?: string
    },
    priorites?: Priorite[],
    statuts?: Statut[],
    motifsAnnulation?: string[],
    search: {
      searchItems?: any,
      availableSearchItems?: any
    },
    demandeList: {
      shortDemande?: ShortDemande,
      demandes?: ShortDemande[],
      sort?: {
        nom: string,
        data: string[]
      },
      paging?: {
        offset: number,
        limit: number,
        count: number
      },
      listDisplay?: string
    }
  } = {
    preferences: {},
    search: {},
    demandeList: {}
  }
  set session(session) {
    this._session = session
  }
  get session() {
    return this._session
  }

  eventEmitter: EventEmitter<any> = new EventEmitter()

  constructor(private _httpService: HttpDefaultService) { }

  connect() {
    window.location.assign(AppConfig.URL_LOGIN(this.conf))
  }

  disconnect(): Promise<any> {
    return this._httpService.get(AppConfig.URL_LOGOUT)
  }

  getHabilitations(): Promise<any> {
    return this._httpService.get(AppConfig.URL_HABILITATIONS)
  }

  getConf(): Promise<any> {
    return this._httpService.get(AppConfig.URL_CONF)
  }

  getStatuts(): Promise<any> {
    return this._httpService.get(AppConfig.URL_STATUTS)
  }

  getPriorites(): Promise<any> {
    return this._httpService.get(AppConfig.URL_PRIORITES)
  }

  getMotifsAnnulation(): Promise<any> {
    return this._httpService.get(AppConfig.URL_MOTIFS_ANNULATION)
  }

}

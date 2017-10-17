import { Injectable, EventEmitter } from '@angular/core'
import { HttpDefaultService } from './_utils'
import { Statut, Priorite, ShortDemande } from './_types'
import { AppConfig } from './app.config'

@Injectable()
export class AppService {

  _user: any = {}
  get user(){
    return this._user
  }
  set user(user){
    this._user = user
  }

  _session: any = {}
  get session(){
    return this._session
  }
  set session(session){
    this._session = session
  }

  eventEmitter: EventEmitter<any> = new EventEmitter()

  constructor(private _httpService: HttpDefaultService) { }
}

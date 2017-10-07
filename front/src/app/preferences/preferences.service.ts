import { Injectable } from '@angular/core'
import { HttpDefaultService } from '../_utils'
import { Statut } from '../_types'
import { AppConfig } from '../app.config'

@Injectable()
export class PreferencesService {

  constructor(private _httpService: HttpDefaultService) { }

  save(id: number, pageLength?: number, statuts?: Statut[]): Promise<any> {

    const preferences: {
      id: number
      nbLigneParPage?: number,
      status?: string
    } = {
        id: id
      }

    if (pageLength) preferences.nbLigneParPage = pageLength

    preferences.status = statuts
      .map(statut => { if (statut.etat) return statut.value })
      .filter(value => { return value })
      .join(';')

    return this._httpService.post(AppConfig.URL_PREFERENCES, preferences)
  }
}

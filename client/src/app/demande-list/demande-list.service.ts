import { Injectable } from '@angular/core'
import { ResponseContentType } from '@angular/http'
import { HttpDefaultService } from '../_utils'
import { ShortDemande } from '../_types'
import { PreferencesService } from '../preferences'
import { AppConfig } from '../app.config'
import * as moment from 'moment'


class Filtre {
  constructor(
    public nom: string,
    public data: Array<string>,
  ) { }
}

@Injectable()
export class DemandeListService {

  lastTimestamp: number

  constructor(
    private _httpService: HttpDefaultService,
    private _preferencesService: PreferencesService
  ) { }

  getDemandes(sort: Object, offset: number, limit: number, searchItems: Object) {
    return this._httpService.post(AppConfig.URL_DEMANDES, this.getParams(sort, offset, limit, searchItems))
      .then(data => {

        if (!this.lastTimestamp || data.timestamp >= this.lastTimestamp) {
          return {
            demandes: data.content,
            totalStatuts: data.totalStatuts,
            count: data.totalElements
          }
        }
      })
  }

  cancelList(selected: ShortDemande[], comment: string) {

    const object = {
      lstIdDemande: selected.map((item) => item.id),
      commentaire: comment
    }
    return this._httpService.post(AppConfig.URL_CANCEL_LIST_DEMANDE, object)
  }

  restoreList(selected: ShortDemande[]) {

    return this._httpService.post(AppConfig.URL_RESTORE_LIST_DEMANDE, selected.map((item) => item.id))
  }

  export(selected: ShortDemande[], allRowsSelected: boolean, searchItems: Object) {

    const object = {
      selected: selected,
      allRowsSelected: allRowsSelected,
      parametreRechercheDto: this.getParams(null, null, null, searchItems)
    }
    return this._httpService.post(AppConfig.URL_EXPORT, object, { responseType: ResponseContentType.ArrayBuffer })
  }

  private getParams(sort: Object, offset: number, limit: number, searchItems: Object): any {

    const filtres: Filtre[] = []
    if (searchItems) {
      this.addPrioriteParam(filtres, searchItems)
      this.addStatutParam(filtres, searchItems)
      this.addDateParam(filtres, searchItems)
      this.addNumeroParam(filtres, searchItems)
      this.addNomPrenomParam(filtres, searchItems)
      this.addExpediteurParam(filtres, searchItems)
      this.addEditeurParam(filtres, searchItems)
    }

    return {
      numeroPage: offset,
      nbLigneAffiche: limit,
      filtres: filtres,
      tri: sort,
      timestamp: +new Date()
    }
  }

  private addPrioriteParam(filtres: Filtre[], searchItems: any) {
    const priorites = searchItems.priorites.values
    if (priorites.length) {
      const data = []
      for (const i in priorites) {
        data.push(priorites[i].value)
      }
      filtres.push(new Filtre('priorite', data))
    }
  }

  private addStatutParam(filtres: Filtre[], searchItems: any) {
    const statuts = searchItems.statuts.values
    if (statuts.length) {
      const data = []
      for (const i in statuts) {
        data.push(statuts[i].value)
      }
      filtres.push(new Filtre('statut', data))
    }
  }

  private addDateParam(filtres: Filtre[], searchItems: any) {
    const dates = searchItems.dates.values
    if (dates.length) filtres.push(new Filtre('date', [moment(dates[0].value.debut).format('DD/MM/YYYY'), moment(dates[0].value.fin).format('DD/MM/YYYY')]))
  }

  private addNumeroParam(filtres: Filtre[], searchItems: any) {
    const numero = searchItems.numero.values
    if (numero.length) {
      const data = []
      for (const i in numero) {
        data.push(numero[i].value)
      }
      filtres.push(new Filtre('numero', data))
    }
  }

  private addNomPrenomParam(filtres: Filtre[], searchItems: any) {
    const auteur = searchItems.auteur.values
    if (auteur.length) filtres.push(new Filtre('nomPrenom', [auteur[0].value]))
  }

  private addExpediteurParam(filtres: Filtre[], searchItems: any) {
    const expediteur = searchItems.expediteur.values
    if (expediteur.length) filtres.push(new Filtre('expediteur', [expediteur[0].value]))
  }

  private addEditeurParam(filtres: Filtre[], searchItems: any) {
    const editeur = searchItems.editeur.values
    if (editeur.length) filtres.push(new Filtre('editeur', [editeur[0].value]))
  }
}

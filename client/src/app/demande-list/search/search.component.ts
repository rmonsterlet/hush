import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { DatePipe } from '@angular/common'
import * as moment from 'moment'
import { AppService } from '../../app.service'
import { Statut } from '../../_types'

@Component({
  selector: 'app-demande-list-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class DemandeListSearchComponent implements OnInit {

  searchItems
  availableSearchItems

  @Output() onSearch = new EventEmitter<any>()

  constructor(private _appService: AppService) { }

  ngOnInit() {

    this.searchItems = this._appService.session.search.searchItems || {
      priorites: { name: 'Priorité', values: [] },
      statuts: { name: 'Statut', values: [] },
      dates: { name: 'Date', values: [] },
      numero: { name: 'Identifiant', values: [] },
      auteur: { name: 'Auteur', values: [] },
      expediteur: { name: 'Expédideur', values: [] },
      editeur: { name: 'Editeur', values: [] }
    }

    this.availableSearchItems = this._appService.session.search.availableSearchItems || {
      priorites: [],
      statuts: [],
      dates: {
        debut: null,
        fin: null
      },
      numero: '',
      auteur: '',
      expediteur: '',
      editeur: ''
    }

    if (this._appService.session.appReady) this.initPreferences()
    this.init()

    this._appService.eventEmitter.subscribe(res => {
      if (res.hasOwnProperty('option')) {
        switch (res.option) {
          case 'onPrioritesLoaded':
            this.initPriorites()
            break
          case 'onStatutsLoaded':
            this.initStatuts()
            break
          case 'onAppReady':
            this.initPreferences()
            this.init()
            break
          case 'onStatutClick':
            this.setSearchStatut(res.value)
            break
          case 'onNbDeclaClick':
            this.addSearchItem('numero', res.value)
            break
        }
      }
    })
  }

  init() {

    if (this._appService.session.appReady) {

      // for ctrl+click behaviour, then going to list
      if (!this.availableSearchItems.priorites.length && !this.searchItems.priorites.length) this.initPriorites()
      if (!this.availableSearchItems.statuts.length && !this.searchItems.statuts.length) this.initStatuts()

      this.search()
    }
  }

  private initPriorites() {
    const priorites = this._appService.session.priorites
    for (const priorite of priorites) {
      this.availableSearchItems.priorites.push({
        text: priorite.libelle,
        class: 'chip-' + priorite.libelle,
        value: priorite.value
      })
    }
  }

  private initStatuts() {
    const statuts = this._appService.session.statuts
    for (const statut of statuts) {
      this.availableSearchItems.statuts.push({
        text: statut.libelle,
        class: 'chip-primary',
        value: statut.value
      })
    }
  }

  initPreferences() {

    if (this._appService.agent.preferences.status && this._appService.session.preferences.status !== this._appService.agent.preferences.status) {

      this._appService.session.preferences.status = this._appService.agent.preferences.status

      while (this.searchItems.statuts.values.length) {
        this.removeSearchItem('statuts', this.searchItems.statuts.values[0], true)
      }
      this.availableSearchItems.statuts
        .filter((statut: Statut) => {
          return this._appService.agent.preferences.status.indexOf(statut.value) > -1
        })
        .forEach((statut: Statut, index, array) => {
          if (array.length !== this._appService.session.statuts.length) {
            this.addSearchItem('statuts', statut, true)
          }
        })
    }
  }

  search() {
    this._appService.session.search = {
      searchItems: this.searchItems,
      availableSearchItems: this.availableSearchItems
    }
    this.onSearch.emit(this.searchItems)
  }

  addSearchItem(searchItemName: string, item?: Object, silent?: boolean) {

    let searchChanged = true
    const search = this.searchItems[searchItemName].values

    // move chip-list item
    if (item instanceof Object) {
      search.push(item)
      const index = this.availableSearchItems[searchItemName].indexOf(item)
      if (index > -1) this.availableSearchItems[searchItemName].splice(index, 1)
    }
    // format value and add if not exists
    else {
      const _value = item || this.availableSearchItems[searchItemName]
      const _text = item || this.formatValue(_value, searchItemName)
      if (_text) {
        const _item = { text: _text, class: 'chip-primary', value: _value }
        const exists = search.filter(i => { return (i.value === _item.value) })
        if (!exists.length) search.push(_item)
      }
      else searchChanged = false
    }

    if (!silent && searchChanged) this.search()
  }

  removeSearchItem(searchItemName: string, item: Object, silent?: boolean) {

    const availables = this.availableSearchItems[searchItemName]
    const search = this.searchItems[searchItemName].values
    const index = search.indexOf(item)
    if (index > -1) {
      // reorder chip-lists
      if (availables instanceof Array) {
        availables.push(item)
        availables.sort((o1, o2) => { return (o1.value as string).localeCompare(o2.value as string) })
      }
      // remove item
      search.splice(index, 1)

      if (!silent) this.search()
    }
  }

  private formatValue(obj: any, searchItemName: string) {

    if (!obj) return null
    if (searchItemName === 'dates') {
      const debut = obj.debut
      const fin = obj.fin

      if (!debut || !fin || !(debut instanceof Date) || !(fin instanceof Date)) return null
      return ('Du ' + moment(debut).format('DD/MM/YYYY') + ' au ' + moment(fin).format('DD/MM/YYYY'))
    }
    else return obj
  }

  private setSearchStatut(value) {

    while (this.searchItems.statuts.values.length) {
      this.removeSearchItem('statuts', this.searchItems.statuts.values[0], true)
    }
    const statuts = this.availableSearchItems.statuts
    this.addSearchItem('statuts', statuts.filter(statut => { return statut.value === value })[0])
  }
}

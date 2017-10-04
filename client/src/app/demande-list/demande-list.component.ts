import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { MdDialog } from '@angular/material'
import { DemandeListService } from './demande-list.service'
import { CancelDemandeComponent } from '../demande/dialog'
import { AppService } from '../app.service'
import { PreferencesService } from '../preferences'
import { AppUtilsService, DialogComponent } from '../_utils'
import { ShortDemande } from '../_types'

import { DemandeListConfig } from './demande-list.component.config'
import * as FileSaver from 'file-saver'


@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss'],
  providers: [
    DemandeListService,
    PreferencesService,
    AppUtilsService
  ]
})
export class DemandeListComponent implements OnInit {

  totalStatuts: any = {}
  listDisplay: string = this.appService.session.demandeList.listDisplay || 'Complet'
  searchDisplay = 'side'

  demandes: ShortDemande[]
  columns: Object[]
  initColumns: Object[]
  messages = {
    emptyMessage: 'Aucun résultat',
    totalMessage: 'demandes trouvées',
    selectedMessage: null
  }
  selected: ShortDemande[] = []
  loadingIndicator = false
  sort: {
    nom: string,
    data: string[]
  } = this.appService.session.demandeList.sort || {
    nom: 'id',
    data: ['desc']
  }
  paging: {
    offset: number,
    limit: number,
    count: number
  } = {
    offset: 0,
    limit: this.appService.agent.preferences.nbLigneParPage,
    count: 0
  }

  @ViewChild('search') search
  @ViewChild('demandeList') demandeList
  @ViewChild('dateTpl') dateTpl: TemplateRef<any>
  @ViewChild('prioriteTpl') prioriteTpl: TemplateRef<any>
  @ViewChild('statutTpl') statutTpl: TemplateRef<any>
  @ViewChild('typeTpl') typeTpl: TemplateRef<any>
  @ViewChild('nomPrenomTpl') nomPrenomTpl: TemplateRef<any>
  @ViewChild('nbDeclaTpl') nbDeclaTpl: TemplateRef<any>
  @ViewChild('nnaTpl') nnaTpl: TemplateRef<any>
  @ViewChild('isniTpl') isniTpl: TemplateRef<any>

  private searchItems

  rowClass = (row) => {
    if (row.nbDecla > 1) {
      return ' demande-list-row-many-decla'
    }
  }

  constructor(
    private _demandeListService: DemandeListService,
    private _preferencesService: PreferencesService,
    private _dialog: MdDialog,
    private _router: Router,
    public appService: AppService,
    public appUtilsService: AppUtilsService
  ) { }

  ngOnInit() {
    this.columns = DemandeListConfig.getColumns({
      tpl: {
        dateTpl: this.dateTpl,
        prioriteTpl: this.prioriteTpl,
        statutTpl: this.statutTpl,
        typeTpl: this.typeTpl,
        nomPrenomTpl: this.nomPrenomTpl,
        nbDeclaTpl: this.nbDeclaTpl,
        nnaTpl: this.nnaTpl,
        isniTpl: this.isniTpl
      }
    })
    this.initColumns = this.columns
    this.onListDisplayChange()

    this.appService.eventEmitter.subscribe(res => {
      if (res.hasOwnProperty('option')) {
        switch (res.option) {
          case 'onAgentLoaded':
            this.initPreferences()
            break
        }
      }
    })
  }

  initPreferences() {
    this.paging.limit = this.appService.agent.preferences.nbLigneParPage
  }

  onStatutClick(value) {
    this.appService.eventEmitter.emit({ option: 'onStatutClick', value: value })
  }

  onCancelDemandesClick() {

    for (const select of this.selected) {
      if (['3000', '4000', '2400'].indexOf(select.statut.value) > -1) {
        const dialog = this._dialog.open(DialogComponent)
        dialog.componentInstance.title = 'Erreur'
        dialog.componentInstance.text = 'Action impossible, certaines demandes sélectionnées sont au statut "En Attente ISNI", "Terminée" ou "Annulée"'
        dialog.componentInstance.icon = {
          code: 'error',
          color: 'warn'
        }
        dialog.componentInstance.actions = {
          cancel: 'Fermer'
        }
        return
      }
    }
    const dialogCancelDemande = this._dialog.open(CancelDemandeComponent)
    dialogCancelDemande.componentInstance.motifsAnnulation = this.appService.session.motifsAnnulation
    dialogCancelDemande.afterClosed().subscribe((comment: string) => {
      if (comment) this._demandeListService.cancelList(this.selected, comment).then(() => {
        this.selected = []
        this.onSearch()
      })
    })
  }

  onRestoreDemandesClick() {

    for (const select of this.selected) {
      if (['2400'].indexOf(select.statut.value) === -1) {
        const dialog = this._dialog.open(DialogComponent)
        dialog.componentInstance.title = 'Erreur'
        dialog.componentInstance.text = 'Action impossible, certaines demandes sélectionnées ne sont pas au statut "Annulée"'
        dialog.componentInstance.icon = {
          code: 'error',
          color: 'warn'
        }
        dialog.componentInstance.actions = {
          cancel: 'Fermer'
        }
        return
      }
    }
    this._demandeListService.restoreList(this.selected).then(() => {
      this.selected = []
      this.onSearch()
    })
  }

  onExporterClick() {
    const allRowsSelected = (this.demandes.length === this.selected.length)
    this._demandeListService.export(this.selected, allRowsSelected, this.searchItems).then((blob: Blob) => {
      FileSaver.saveAs(blob, 'export.xlsx')
    })
  }

  onNbDeclaClick(value) {
    this.appService.eventEmitter.emit({ option: 'onNbDeclaClick', value: value })
  }

  onSearch(searchItems?) {

    this.loadingIndicator = true

    // if search has changed, save it and reset the offset and seleted
    if (searchItems) {
      this.searchItems = searchItems
      this.paging.offset = 0
      this.selected = []
    }

    // Use session's paging if exists and destroy it
    const paging = this.appService.session.demandeList.paging
    if (paging) {
      this.paging.offset = paging.offset
      this.paging.limit = paging.limit
      delete this.appService.session.demandeList.paging
    }

    this._demandeListService.getDemandes(this.sort, this.paging.offset, this.paging.limit, this.searchItems)
      .then(data => {
        this.demandes = data.demandes
        this.totalStatuts = data.totalStatuts
        this.paging.count = data.count
        this.loadingIndicator = false
        this.replaceSelection()
      })
      .catch(error => this.loadingIndicator = false)
  }

  onActivate(event) {

    if(event.type != 'click') return

    if (event.event.ctrlKey) {
      window.open(`${this.appService.conf.appUrl}/demande/${event.row.id}`, '_blank')
    }
    else {
      if (event.column.checkboxable || event.column.prop === 'nbDecla' || event.column.prop === 'nna' || event.column.prop === 'isni') return
      else {
        this.appService.session.demandeList = {
          shortDemande: event.row,
          demandes: this.demandes.filter((shortDemande: ShortDemande) => shortDemande), // remove empty elements
          sort: this.sort,
          paging: this.paging,
          listDisplay: this.listDisplay
        }
        this._router.navigate(['demande', event.row.id])
      }
    }
  }

  onSort(event) {

    let nom = event.sorts[0].prop
    const data = [event.sorts[0].dir]

    if (nom === 'dateCreation') nom = 'date'
    this.sort = {
      nom: nom,
      data: data
    }
    this.onSearch()
  }

  onPage(event) {
    this.paging.offset = event.offset
    this.onSearch()
  }

  onLimitChange(event) {
    this.paging.offset = 0
    this.onSearch()
  }

  onListDisplayChange() {

    if (this.listDisplay === 'Complet') {
      this.columns = this.initColumns
    }
    else if (this.listDisplay === 'Simple') {
      this.columns = this.columns.filter((col: any) => {
        return col.name !== 'NNA' && col.name !== 'ISNI'
      })
    }
    setTimeout(() => this.demandeList.recalculate(), 300)
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected)
  }

  toggle() {
    this.search.toggle()
    setTimeout(() => this.demandeList.recalculate(), 300)
  }

  onSearchDisplayClick() {
    switch (this.searchDisplay) {
      case 'side':
        this.searchDisplay = 'over'
        break
      case 'over':
        this.searchDisplay = 'side'
        break
    }
    this.toggle()
  }

  private replaceSelection() {

    for (const index in this.selected) {
      for (const demande of this.demandes) {
        if (demande.id === this.selected[index].id) this.selected[index] = demande
      }
    }
  }

}

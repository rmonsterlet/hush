import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'
import { MdDialog } from '@angular/material'
import { Demande } from '../../../_types'
import { AppService } from '../../../app.service'
import { EditNnaComponent } from '../../../demande/dialog'
import { DonneesCatalogueConfig } from './donnees-catalogue.component.config'
import { DonneesCatalogueService } from './donnees-catalogue.service'

@Component({
  selector: 'app-demande-tabs-donnees-catalogue',
  templateUrl: './donnees-catalogue.component.html',
  styleUrls: ['./donnees-catalogue.component.scss'],
  providers: [
    DonneesCatalogueService
  ]
})
export class DonneesCatalogueComponent implements OnInit, OnChanges {

  @Input() demande: Demande
  @Output('onDemandeChange') onDemandeChange = new EventEmitter<Demande>()

  @ViewChild('nnaTpl') nnaTpl: TemplateRef<any>
  @ViewChild('isniTpl') isniTpl: TemplateRef<any>
  @ViewChild('actionTpl') actionTpl: TemplateRef<any>

  notices: any[] = [
    {
      title: 'Notices complètes AVEC dates',
      rows: [],
      columns: [],
      loadingIndicator: true,
      messages: {
        emptyMessage: 'Aucun résultat',
        totalMessage: null,
        selectedMessage: null
      }
    },
    {
      title: 'Notices complètes SANS dates',
      rows: [],
      columns: [],
      loadingIndicator: true,
      messages: {
        emptyMessage: 'Aucun résultat',
        totalMessage: null,
        selectedMessage: null
      }
    },
    {
      title: 'Notices élémentaires',
      rows: [],
      columns: [],
      loadingIndicator: true,
      messages: {
        emptyMessage: 'Aucun résultat',
        totalMessage: null,
        selectedMessage: null
      }
    }
  ]

  constructor(
    private _donneesCatalogueService: DonneesCatalogueService,
    private _dialog: MdDialog,
    public appService: AppService,
  ) { }

  ngOnInit() {

    const tpl = {
      nnaTpl: this.nnaTpl,
      isniTpl: this.isniTpl,
      actionTpl: this.actionTpl
    }

    this.notices[0].columns = DonneesCatalogueConfig.getNotices0Columns({ tpl: tpl })
    this.notices[1].columns = DonneesCatalogueConfig.getNotices1Columns({ tpl: tpl })
    this.notices[2].columns = DonneesCatalogueConfig.getNotices2Columns({ tpl: tpl })

  }

  ngOnChanges(changes: SimpleChanges) {
    const prev = changes.demande.previousValue
    const curr = changes.demande.currentValue
    if (!prev && curr || (prev && prev.idDemande !== curr.idDemande)) {
      this.demande = changes.demande.currentValue

      for (const i of [0, 1, 2]) {
        this.notices[i].count = 0
        this.notices[i].position = null
        this.notices[i].rows = []
        this.getNotices(i)
      }
    }
  }

  getNotices(i: number) {

    if (i === 0 && !this.demande.dateNaissance) {
      this.notices[0].hidden = true
      return
    }

    this.notices[i].collapsed = false
    this.notices[i].loadingIndicator = true
    this._donneesCatalogueService.rechercheMotAutorite(this.demande.idDemande, this.notices[i].position, (i === 0 || i === 1), (i === 0))
      .then(res => {
        this.notices[i].count = res.nbResultat
        this.notices[i].position = res.recordSuivant
        this.notices[i].rows = this.notices[i].rows.concat(res.auteurs)
        this.notices[i].loadingIndicator = false
        if (!this.notices[i].rows.length) this.notices[i].collapsed = true
      })
      .catch((err) => this.notices[i].loadingIndicator = false)
  }

  onRefreshClick(i: number) {
    this.notices[i].rows = []
    this.notices[i].position = null
    this.getNotices(i)
  }

  onAssocierNnaClick(row: any) {
    const dialogEditNna = this._dialog.open(EditNnaComponent, {
      disableClose: true
    })
    dialogEditNna.componentInstance.idDemande = this.demande.idDemande
    dialogEditNna.componentInstance.nna = row.nna
    dialogEditNna.componentInstance.autoValid = true

    dialogEditNna.afterClosed().subscribe((demande: Demande) => {
      if (demande) this.onDemandeChange.emit(demande)
    })
  }
}

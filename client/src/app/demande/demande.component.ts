import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MdDialog } from '@angular/material'
import { ActivatedRoute, Params } from '@angular/router'
import { DemandeService } from './demande.service'
import { AppService } from '../app.service'
import { AppUtilsService, DialogComponent } from '../_utils'
import { ShortDemande, Demande, DonneesBiblio, Statut, Priorite } from '../_types'
import {
  ShowHistoryComponent,
  EditStatutComponent,
  EditPrioriteComponent,
  EditNnaComponent,
  CancelDemandeComponent,
  AddCommentaireComponent,
  EditCommentaireComponent,
  ShowEanComponent
} from './dialog'

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss'],
  providers: [
    DemandeService,
    AppUtilsService
  ]
})
export class DemandeComponent implements OnInit {

  demande: Demande
  donneesBiblio: DonneesBiblio

  resumeExpanded = false
  noteBibExpanded = false

  imgUrls

  nextDemandeHidden = false

  constructor(
    private _demandeService: DemandeService,
    private _dialog: MdDialog,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public appService: AppService,
    public appUtilsService: AppUtilsService,
  ) { }

  ngOnInit() {
    this.fetch()
    if (!this.appService.session.demandeList.demandes) this.nextDemandeHidden = true
  }

  fetch() {
    const shortDemande: ShortDemande = this.appService.session.demandeList.shortDemande
    if (shortDemande) {
      this._demandeService.getDemande(shortDemande.id).then((demande: Demande) => this.demande = demande)
      this._demandeService.getDonneesBiblio(shortDemande.idDecla).then((donneesBiblio: DonneesBiblio) => this.onDonneesBiblioLoaded(donneesBiblio))
    }
    else {

      this._activatedRoute.params.subscribe((params: Params) => {
        this._demandeService.getDemande(+params['id']).then((demande: Demande) => {
          this.demande = demande
          this._demandeService.getDonneesBiblio(this.demande.identifiantDecla).then((donneesBiblio: DonneesBiblio) => this.onDonneesBiblioLoaded(donneesBiblio))
        })
      })
    }
  }

  onDonneesBiblioLoaded(donneesBiblio: DonneesBiblio) {
    this.donneesBiblio = donneesBiblio
    this.imgUrls = this._demandeService.getImgUrls(this.donneesBiblio, this.appService.conf.baseUrlCouv)
  }

  onDemandeChange(demande: Demande) {
    this.demande = demande
  }


  /**
   * @param direction : false = previous, true = next
   */
  onNextDemandeClick(direction: boolean) {

    const shortDemande: ShortDemande = this.appService.session.demandeList.shortDemande
    if (shortDemande) {
      const dems: ShortDemande[] = this.appService.session.demandeList.demandes
      const i = dems.indexOf(shortDemande)
      const nextDemande: ShortDemande = direction ? (dems[i + 1] || dems[0]) : (dems[i - 1] || dems[dems.length - 1])
      this.appService.session.demandeList.shortDemande = nextDemande
      this._router.navigate(['demande', nextDemande.id]).then(() => this.fetch())
    }
  }

  onShowHistoryClick() {
    const dialogShowHistory = this._dialog.open(ShowHistoryComponent)
    dialogShowHistory.componentInstance.historiques = this.demande.historiques
  }

  onEditStatutClick() {
    const dialogEditStatut = this._dialog.open(EditStatutComponent)
    dialogEditStatut.componentInstance.statuts = this.appService.session.statuts
    dialogEditStatut.componentInstance.statut = this.demande.statut
    dialogEditStatut.afterClosed().subscribe((newStatut: Statut) => {
      if (newStatut) this._demandeService.updateStatut(this.demande.idDemande, newStatut).then((demande: Demande) => this.demande = demande)
    })
  }

  onEditPrioriteClick() {
    const dialogEditPriorite = this._dialog.open(EditPrioriteComponent)
    dialogEditPriorite.componentInstance.priorites = this.appService.session.priorites
    dialogEditPriorite.componentInstance.priorite = this.demande.priorite
    dialogEditPriorite.afterClosed().subscribe((response: any) => {
      if (response) this._demandeService.updatePriorite(this.demande.idDemande, response).then((demande: Demande) => this.demande = demande)
    })
  }

  onEditNnaClick() {
    const dialogEditNna = this._dialog.open(EditNnaComponent, {
      disableClose: true
    })
    dialogEditNna.componentInstance.idDemande = this.demande.idDemande
    dialogEditNna.componentInstance.nna = this.demande.nna
    dialogEditNna.componentInstance.statut = this.demande.statut
    dialogEditNna.afterClosed().subscribe((demande: Demande) => {
      if (demande) this.demande = demande
    })
  }

  onSearchIsniClick() {
    this._demandeService.searchIsni(this.demande.idDemande)
      .then((demande: Demande) => this.demande = demande)
  }

  onCancelDemandeClick() {
    const dialogCancelDemande = this._dialog.open(CancelDemandeComponent)
    dialogCancelDemande.componentInstance.motifsAnnulation = this.appService.session.motifsAnnulation
    dialogCancelDemande.afterClosed().subscribe((comment: string) => {
      if (comment) this._demandeService.cancelDemande(this.demande.idDemande, comment).then((demande: Demande) => this.demande = demande)
    })
  }

  onRestoreDemandeClick() {
    const statutEnCours = this.appService.session.statuts.filter((statut: Statut) => statut.value === '2000')[0]
    this._demandeService.updateStatut(this.demande.idDemande, statutEnCours).then((demande: Demande) => this.demande = demande)
  }

  onAddCommentaireClick() {
    const dialogAddCommentaire = this._dialog.open(AddCommentaireComponent)
    dialogAddCommentaire.afterClosed().subscribe((comment: string) => {
      if (comment) this._demandeService.addComment(this.demande.idDemande, comment).then((demande: Demande) => this.demande = demande)
    })
  }

  onEditCommentaireClick() {
    const dialogEditCommentaire = this._dialog.open(EditCommentaireComponent, {
      disableClose: true
    })
    dialogEditCommentaire.componentInstance.demande = this.demande
    dialogEditCommentaire.afterClosed().subscribe((demande: Demande) => {
      if (demande) this.demande = demande
    })
  }

  onShowEanClick() {
    const dialogShowEan = this._dialog.open(ShowEanComponent)
    dialogShowEan.componentInstance.baseUrl = this.appService.conf.baseUrlNotice
    dialogShowEan.componentInstance.eanLie = this.demande.eanLie
  }

  zoom() {
    const dialog = this._dialog.open(DialogComponent)
    dialog.componentInstance.title = 'Première de couverture'
    dialog.componentInstance.icon = {
      code: 'book',
      color: 'primary'
    }
    dialog.componentInstance.content = `<img src=${this.imgUrls.urlC1} />`
    dialog.componentInstance.overflowHidden = true
  }

  onOpenDeclaClick(idDecla: number) {
    window.open(this._demandeService.getSaisieDeclaUrl(idDecla, this.appService.conf.baseUrlDlWebapp))
  }

  onVoirOnixClick(idDecla: number) {
    this._demandeService.getOnix(idDecla).then(onix => {
      const dialog = this._dialog.open(DialogComponent)
      dialog.componentInstance.title = 'Voir Onix'
      dialog.componentInstance.icon = {
        code: 'remove_red_eye',
        color: 'primary'
      }
      dialog.componentInstance.text = onix
      dialog.componentInstance.actions = {
        cancel: 'Fermer'
      }
    })
  }

  searchByIDLocalClick(){   
    // reinit availableSearchItems
    this.appService.session.search.availableSearchItems = {
      priorites: [],
      statuts: [],
      dates: {
        debut: '',
        fin: ''
      },
      numero: '',
      auteur: '',
      expediteur: '',
      editeur: ''
    }
    const priorites = this.appService.session.priorites
    for (const priorite of priorites) {
      this.appService.session.search.availableSearchItems.priorites.push({
        text: priorite.libelle,
        class: 'chip-' + priorite.libelle,
        value: priorite.value
      })
    }
    const statuts = this.appService.session.statuts
    for (const statut of statuts) {
      this.appService.session.search.availableSearchItems.statuts.push({
        text: statut.libelle,
        class: 'chip-primary',
        value: statut.value
      })
    }

    //clear searchItems
    for(let i in this.appService.session.search.searchItems){
      this.appService.session.search.searchItems[i].values = []
    }

    //add idInterneExpediteur to searchItems.numero
    const numero = { text: this.demande.idInterneExpediteur, class: 'chip-primary', value: this.demande.idInterneExpediteur }
    this.appService.session.search.searchItems['numero'].values.push(numero)

    //redirect to list
    this._router.navigate(['demande-list'])
  }
}

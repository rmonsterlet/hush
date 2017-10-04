import { Component, OnInit } from '@angular/core'
import { PreferencesService } from './preferences.service'
import { AppService } from '../app.service'
import { Priorite, Statut } from '../_types'

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  providers: [
    PreferencesService
  ]
})
export class PreferencesComponent implements OnInit {

  priorites: Priorite[]
  allSelectedPriorite = true

  statuts: Statut[]
  allSelectedStatut = true

  pageLength: number

  constructor(private _preferencesService: PreferencesService, private _appService: AppService) { }

  ngOnInit() {

    // priorites
    this.priorites = this._appService.session.priorites
    // if (this._appService.agent.preferences.priorites) {
    const agentPriorites = [] // this._appService.agent.preferences.priorites.split(';').filter(value => { return value }) // the filter removes empty elm
    prioriteLoop: for (const priorite of this.priorites) {
      priorite.etat = false
      for (const agentPriorite of agentPriorites) {
        if (agentPriorite === priorite.value) {
          priorite.etat = true
          continue prioriteLoop
        }
      }
    }
    // }
    for (const priorite of this.priorites) {
      if (!priorite.etat) {
        this.allSelectedPriorite = false
        break
      }
    }

    // statuts
    this.statuts = this._appService.session.statuts
    if (this._appService.agent.preferences.status) {
      const agentStatuts = this._appService.agent.preferences.status.split(';').filter(value => { return value }) // the filter removes empty elm
      statutLoop: for (const statut of this.statuts) {
        statut.etat = false
        for (const agentStatut of agentStatuts) {
          if (agentStatut === statut.value) {
            statut.etat = true
            continue statutLoop
          }
        }
      }
    }
    for (const statut of this.statuts) {
      if (!statut.etat) {
        this.allSelectedStatut = false
        break
      }
    }

    // pageLength
    this.pageLength = this._appService.agent.preferences.nbLigneParPage
  }

  allSelectedPrioriteChange(event) {
    this.allSelectedPriorite = event.checked
    for (const priorite of this.priorites) priorite.etat = this.allSelectedPriorite
  }

  toogleChangePriorite(event, value) {
    if (!event.checked) this.allSelectedPriorite = false
    let allSelected = true
    for (const priorite of this.priorites) {
      if (priorite.value === value) priorite.etat = event.checked
      if (!priorite.etat) allSelected = false
    }
    if (allSelected) this.allSelectedPriorite = true
  }

  allSelectedStatutChange(event) {
    this.allSelectedStatut = event.checked
    for (const statut of this.statuts) statut.etat = this.allSelectedStatut
  }

  toogleChangeStatut(event, value) {
    if (!event.checked) this.allSelectedStatut = false
    let allSelected = true
    for (const statut of this.statuts) {
      if (statut.value === value) statut.etat = event.checked
      if (!statut.etat) allSelected = false
    }
    if (allSelected) this.allSelectedStatut = true
  }

  save() {
    const id = this._appService.agent.preferences.id
    this._preferencesService.save(id, this.pageLength, this.statuts).then(preferences => {
      this._appService.getHabilitations().then(agent => this._appService.agent = agent)
    })
  }
}

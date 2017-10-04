import { Component, OnInit, Optional } from '@angular/core'
import { MdDialogRef, MdDialog, DialogRole } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { EditNnaService } from './edit-nna.service'
import { DialogComponent } from '../../../_utils'
import { Demande, Statut } from '../../../_types'

@Component({
  selector: 'app-demande-edit-nna',
  templateUrl: './edit-nna.component.html',
  styleUrls: ['./edit-nna.component.scss'],
  providers: [
    EditNnaService,
    FormBuilder
  ]
})
export class EditNnaComponent implements OnInit {

  nnaForm: FormGroup
  idDemande
  nna
  statut: Statut
  autoValid = false

  constructor(
    @Optional() public dialogEditNna: MdDialogRef<EditNnaComponent>,
    private _editNnaService: EditNnaService,
    public formBuilder: FormBuilder,
    private _dialog: MdDialog,
  ) { }

  ngOnInit() {

    this.nnaForm = this.formBuilder.group({
      'nna': [this.nna, Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}$')])]
    })

    if (this.autoValid) this.onValiderClick()
  }

  onSupprimerClick() {

    const dialog = this._dialog.open(DialogComponent)
    dialog.componentInstance.title = 'Vous allez supprimer le NNA de cette demande. Êtes-vous sûr ?'
    dialog.componentInstance.icon = {
      code: 'warning',
      color: 'accent'
    }
    dialog.componentInstance.actions = {
      cancel: 'Non',
      ok: 'Oui'
    }
    dialog.afterClosed().subscribe((yes) => {
      if (yes) this._editNnaService.deleteNna(this.idDemande).then(response => {

        if(this.statut.value === '4000' && response.suiviHebdoSent){
          const dialogContactDSI = this._dialog.open(DialogComponent)
          dialogContactDSI.componentInstance.title = 'Attention, les informations NNA et ISNI ont déjà été envoyées à l\'expéditeur. Pensez à l\'avertir des modifications.'
          dialogContactDSI.componentInstance.icon = {
            code: 'warning',
            color: 'accent'
          }
          dialogContactDSI.componentInstance.actions = {
            ok: 'Ok'
          }
          dialogContactDSI.afterClosed().subscribe((yes) => {
            dialogContactDSI.close()
            this.dialogEditNna.close(response.demande)
          })
        }
        else
          this.dialogEditNna.close(response.demande)
      })
    })
  }

  onValiderClick() {
    this._editNnaService.prevalidateNna(this.idDemande, this.nnaForm.get('nna').value)
      .then(preValid => {
        if (preValid.message) {
          const dialog = this._dialog.open(DialogComponent)
          dialog.componentInstance.title = preValid.message
          dialog.componentInstance.icon = {
            code: 'warning',
            color: 'accent'
          }
          dialog.componentInstance.actions = {
            cancel: 'Fermer'
          }
        }
        else {
          const dialog = this._dialog.open(DialogComponent)
          dialog.componentInstance.title = 'Validation du NNA lié'
          dialog.componentInstance.icon = {
            code: 'help',
            color: 'primary'
          }
          dialog.componentInstance.text = `Vous êtes sur le point de mettre à jour la demande avec ce NNA : `
          dialog.componentInstance.text += `${preValid.nna} (${preValid.nom}, ${preValid.prenom}${preValid.isni ? ', ' + preValid.isni : ''}). Êtes-vous sûr de vouloir continuer ?`
          dialog.componentInstance.actions = {
            cancel: 'Non',
            ok: 'Oui'
          }
          dialog.afterClosed().subscribe((yes) => {
            if (yes) this._editNnaService.validateNna(preValid).then((demande: Demande) => this.dialogEditNna.close(demande))
          })
        }
      })
  }
}

import { Component, OnInit, Optional } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-cancel-demande',
  templateUrl: './cancel-demande.component.html',
  styleUrls: ['./cancel-demande.component.scss']
})
export class CancelDemandeComponent implements OnInit {

  motifsAnnulation
  
  motif
  cancelDemandeForm: FormGroup

  constructor(
    @Optional() public dialogCancelDemande: MdDialogRef<CancelDemandeComponent>,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.cancelDemandeForm = this.formBuilder.group({
      'commentaire': ['Demande annulée : (motif)', Validators.compose([Validators.required, Validators.maxLength(512)])]
    })
  }

  onMotifChange(commentaire){
    commentaire.value = 'Demande annulée : ' + this.motif
  }
}

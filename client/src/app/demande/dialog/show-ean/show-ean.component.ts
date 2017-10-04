import { Component, OnInit, Optional } from '@angular/core'
import { MdDialogRef } from '@angular/material'

@Component({
  selector: 'app-demande-show-ean',
  templateUrl: './show-ean.component.html',
  styleUrls: ['./show-ean.component.scss']
})
export class ShowEanComponent implements OnInit {

  eanLie: string[]
  baseUrl: string

  constructor(
    @Optional() public dialogEditStatut: MdDialogRef<ShowEanComponent>
  ) {}

  ngOnInit() {
    //remove duplicates
    this.eanLie = Array.from(new Set(this.eanLie).values())
  }
}

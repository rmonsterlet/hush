import { Component, OnInit, Optional } from '@angular/core'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title: string
  icon: {
    color?: string,
    code?: string
  }
  content: string
  overflowHidden = false
  text: string
  actions: {
    cancel?: string,
    ok?: string
  }

  constructor(
    @Optional() public dialog: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit() {
  }

}

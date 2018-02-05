import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss']
})
export class DevComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
  }

}

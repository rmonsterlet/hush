import { Component, OnInit } from '@angular/core'
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  ws
  broadcast
  datas = []

  constructor(private _appService: AppService) { }

  ngOnInit() {

    this.ws = new WebSocket('ws://localhost:4100')
    this.ws.onmessage = (event: MessageEvent) => {
      this.datas.push(JSON.parse(event.data))
    }
  }

  onSendClick() {

    const obj = {
      broadcast: true,
      author: this._appService.user.name,
      color: this._appService.user.color,
      date: new Date(),
      message: this.broadcast
    }
    this.ws.send(JSON.stringify(obj))
  }

}

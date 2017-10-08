import { Component, OnInit } from '@angular/core'
import { AppService } from 'app/app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  user

  ws
  message
  datas = []

  constructor(private _appService: AppService) { }

  ngOnInit() {

    this.user = this._appService.user

    this.ws = new WebSocket('ws://localhost:4100')
    this.ws.onmessage = (event: MessageEvent) => {
      this.datas.push(JSON.parse(event.data))
      window.scrollTo(0, document.body.scrollHeight + 100)
    }
  }

  onSendClick() {

    if(!this.message || !this.message.trim().length)
      return

    const obj = {
      broadcast: true,
      name: this.user.name,
      color: this.user.color,
      date: new Date(),
      message: this.message
    }
    this.ws.send(JSON.stringify(obj))
  }

}

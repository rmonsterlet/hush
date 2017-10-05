import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  ws

  author
  color
  broadcast
  datas = []

  constructor() { }

  ngOnInit() {

    this.ws = new WebSocket('ws://localhost:4100')
    this.ws.onmessage = (event: MessageEvent) => {
      this.datas.push(JSON.parse(event.data))
    }
  }

  onSendClick() {

    const obj = {
      broadcast: true,
      author: this.author,
      color: this.color,
      date: new Date(),
      message: this.broadcast
    }
    this.ws.send(JSON.stringify(obj))
  }

}

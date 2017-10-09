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

  rooms: any = []

  selectedIndex = 0

  constructor(private _appService: AppService) { }

  ngOnInit() {

    this.user = this._appService.user

    this.ws = new WebSocket('ws://localhost:4100')
    this.ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)

      if(data.action === 'UPDATE_ROOMS'){
        this.rooms = data.rooms
      }
      else if(data.action === 'CREATE_ROOM'){
        this.rooms.push(data.room)
      }
      else if(data.action === 'BROADCAST'){

        let room = this.rooms.find(room => room.id === data.roomId)
        if (!room)
          this.rooms.forEach(room => {
            room.messages.push(data.message)
          })
        else {
          room.messages.push(data.message)
        }
      }
    }
  }

  onSendClick() {
    if (!this.message || !this.message.trim().length)
      return

    this.ws.send(JSON.stringify({
      action: 'BROADCAST',
      roomId: this.rooms[this.selectedIndex].id,
      message: {
        user: this.user,
        date: new Date(),
        text: this.message
      }
    }))
  }

  onCreateRoomClick() {

    this.ws.send(JSON.stringify({
      action: 'CREATE_ROOM'
    }))
  }
}

import { AppWebSocket } from '../server'

export interface AppController{
    onMessage(ws: AppWebSocket, data: any): void
}

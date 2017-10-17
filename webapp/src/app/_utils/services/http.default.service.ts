import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Http, Headers, RequestOptionsArgs } from '@angular/http'
import { Router } from '@angular/router'
import { DialogComponent } from '../components'

import 'rxjs/add/operator/toPromise'

@Injectable()
export class HttpDefaultService {

    private _headers: Headers
    constructor(
        private _http: Http,
        private _dialog: MatDialog,
        private _router: Router
    ) {
        this._headers = new Headers()
        this._headers.append('Content-Type', 'application/json')
        this._headers.append('Access-Control-Allow-Origin', '*')
    }

    /*async getAsync(url: string, options?: RequestOptionsArgs){
        return await this.get(url, options)
    }*/

    public get(url: string, options?: RequestOptionsArgs): Promise<any> {

        const _options: RequestOptionsArgs = options || {}
        return this._http.get(url, options)
            .toPromise()
            .then((response) => this.handleSuccess(response))
            .catch((error) => this.handleError(error))
    }

    public post(url: string, object?: any, options?: RequestOptionsArgs): Promise<any> {
        const _options: RequestOptionsArgs = options || { headers: this._headers }
        return this._http.post(url, object, _options)
            .toPromise()
            .then((response) => this.handleSuccess(response))
            .catch((error) => this.handleError(error))
    }

    private handleSuccess(response) {

        switch (response.headers.get('Content-Type').split(';')[0]) {
            case 'application/json':
                return response.json()
            case 'application/octet-stream':
                return response.blob()
            default:
                return response.text()
        }
    }

    private handleError(error: any): Promise<never> {
        console.warn('An error occurred', error)

        switch (error.status) {

            case 403:
                this._router.navigate(['denied'])
                break
            case 500:
                const json = error.json()
                const dialog = this._dialog.open(DialogComponent, {
                    disableClose: true,
                    data: {
                        title: json.titre,
                        icon: {
                            code: 'error',
                            color: 'warn'
                        },
                        content: json.message,
                        actions: {
                            cancel: 'Fermer'
                        }
                    }
                })
                return Promise.reject(error.message || error)
            default:
                console.warn('An error occurred', error)
                break
        }
    }
}

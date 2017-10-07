import { Injectable } from '@angular/core'

@Injectable()
export class AppUtilsService {

    // Permet l'affichage de l'ISNI sous la forme 0000 0000 0000 0000
    public formatIsni(isni: string) {
        if (!isni) return null
        else return isni.match(/.{1,4}/g).join(' ')
    }

    // Permet d'extraire le NNB de l'ark : ark:/12148/cb43651440j -> 43651440
    public arkToNNB(ark: string) {
        if (!ark) return null
        else {
            const res = ark.match(/^ark:\/\d+\/\w+(\d{8})\w+$/)
            return (res && res.length > 1) ? res[1] : null
        }
    }
}

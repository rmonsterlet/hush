import { Statut } from '../_types'

export class ShortDemande {
  constructor(
    public id: number,
    public dateCreation: string,
    public priorite: string,
    public statut: Statut,
    public type: number | string,
    public nomPrenom: string,
    public idDecla: number,
    public nbDecla: number,
    public expediteur: string,
    public editeur: string,
    public nna?: string | number,
    public arkNna?: string | number,
    public isni?: string | number,
    public commentaire?: string
  ) {}
}

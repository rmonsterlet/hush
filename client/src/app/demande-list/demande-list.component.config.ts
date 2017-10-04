export class DemandeListConfig {
    static getColumns = (params) => {
        return [
            {
                width: 30,
                sortable: false,
                resizeable: false,
                headerCheckboxable: true,
                checkboxable: true,
                canAutoResize: false
            },
            {
                name: 'ID',
                prop: 'id',
                width: 75,
                canAutoResize: false
            },
            {
                name: 'Date',
                prop: 'dateCreation',
                width: 125,
                cellTemplate: params.tpl.dateTpl,
                canAutoResize: false
            },
            {
                name: 'Priorité',
                prop: 'priorite',
                width: 75,
                cellTemplate: params.tpl.prioriteTpl,
                canAutoResize: false
            },
            {
                name: 'Statut',
                prop: 'statut',
                width: 75,
                cellTemplate: params.tpl.statutTpl,
                canAutoResize: false
            },
            {
                name: 'Type',
                prop: 'type',
                width: 75,
                cellTemplate: params.tpl.typeTpl,
                canAutoResize: false
            },
            {
                name: 'Auteur',
                prop: 'nomPrenom',
                width: 200,
                cellTemplate: params.tpl.nomPrenomTpl,
                canAutoResize: false
            },
            {
                name: 'Nb',
                prop: 'nbDecla',
                width: 50,
                cellTemplate: params.tpl.nbDeclaTpl,
                canAutoResize: false
            },
            {
                name: 'Expéditeur',
                prop: 'expediteur',
                width: 200
            },
            {
                name: 'Editeur',
                prop: 'editeur',
                width: 200
            },
            {
                name: 'NNA',
                prop: 'nna',
                width: 150,
                cellTemplate: params.tpl.nnaTpl,
                canAutoResize: false
            },
            {
                name: 'ISNI',
                prop: 'isni',
                width: 200,
                cellTemplate: params.tpl.isniTpl,
                canAutoResize: false
            }
        ]
    }
}

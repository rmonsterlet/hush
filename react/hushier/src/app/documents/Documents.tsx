import * as React from 'react'
import Button from 'material-ui/Button';
import { Grid } from '../utils/Grid';

const columns = [
  {
    key: 'idLot',
    name: 'Id Lot'
  },
  {
    key: 'type',
    name: 'Type'
  },
  {
    key: 'expediteur',
    name: 'Expediteur'
  },
  {
    key: 'nonAssignes',
    name: 'Non Assignes',
  },
  {
    key: 'valide',
    name: 'Validé',
  },
  {
    key: 'rejete',
    name: 'Rejeté',
  },
  {
    key: 'suspendu',
    name: 'Suspendu',
  },
  {
    key: 'nbDocs',
    name: 'Nb Docs',
  }
]

type DocumentsProps = {
}
type DocumentsState = {
  rows: any[]
}
export class Documents extends React.Component<DocumentsProps, DocumentsState> {

  constructor(props: DocumentsProps) {
    super(props)
    this.state = {
      rows: require('json-loader!../data/documents/data.json')
    }
  }

  render() {

    const { rows } = this.state

    return (
      <Grid
        columns={columns}
        rows={rows}
        paginable={true}
      />
    )
  }
}
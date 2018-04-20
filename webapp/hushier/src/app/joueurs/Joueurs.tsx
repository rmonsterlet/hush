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

type JoueursProps = {
}
type JoueursState = {
  rows: any[]
}
export class Joueurs extends React.Component<JoueursProps, JoueursState> {

  constructor(props: JoueursProps) {
    super(props)
    this.state = {
      rows: require('json-loader!../data/documents/data.json')
    }
  }

  render() {

    const { rows } = this.state

    return (
      /*<Grid
        columns={columns}
        rows={rows}
        paginable={true}
      />*/
      <div/>
    )
  }
}
import * as React from 'react'
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';

import { Grid } from '../utils/Grid';

const columns = [

  {
    key: 'idDoc',
    name: 'Id Doc',
    numeric: true
  },
  {
    key: 'idLot',
    name: 'Id Lot',
    numerci: true
  },
  {
    key: 'declaration',
    name: 'Déclaration'
  },
  {
    key: 'isbn',
    name: 'ISBN'
  },
  {
    key: 'titre',
    name: 'Titre'
  },
  {
    key: 'format',
    name: 'Format'
  },
  {
    key: 'etat',
    name: 'Etat'
  },
  {
    key: 'commentaire',
    name: 'Commentaire'
  }
]

type ScoresProps = {

}
type ScoresState = {
  rows: any[]
  selected: any[]
  buttonsDisabled: boolean
  buttonFinishedDisabled: boolean
  modal: {
    open: boolean,
    data?: any
  }
}

export class Scores extends React.Component<ScoresProps, ScoresState> {

  constructor(props: ScoresProps) {
    super(props)
    this.state = {
      rows: require('json-loader!../data/panier/data.json'),
      selected: [],
      buttonsDisabled: true,
      buttonFinishedDisabled: true,
      modal: {
        open: false
      }
    }
  }

  onSelectChange = (selected: any[]) => {
    this.setState({
      selected,
      buttonsDisabled: selected.length === 0,
      buttonFinishedDisabled: selected.filter(row => row.etat === 'Terminé').length === 0
    })
  }

  onModalClick = (data: any) => {
    this.setState({
      modal: {
        open: true,
        data
      }
    })
  }

  onModalClose = () => {
    this.setState({
      modal: {
        open: false
      }
    })
  }

  render() {

    const { rows, modal, selected, buttonFinishedDisabled, buttonsDisabled } = this.state

    return (
      <div/>
      /*<div style={{ marginBottom: 20 }}>
        <Grid
          columns={columns}
          rows={rows}
          selection={true}
          filters={true}
          onSelectChange={this.onSelectChange}
        />
        {
          modal.open && <Dialog
            open={this.state.modal.open}
            onClose={this.onModalClose}
            aria-labelledby="simple-dialog-title"
          >
            <DialogTitle id="simple-dialog-title">{modal.data && modal.data.name}</DialogTitle>
            <DialogContent>
              <List>
                {selected.map(elem => (
                  <ListItem button={true}>
                    <ListItemText primary={`ID Doc : ${elem.idDoc}`} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onModalClose} color="primary">
                Annuler
            </Button>
              <Button onClick={this.onModalClose} variant="raised" color="primary" autoFocus={true}>
                Valider
            </Button>
            </DialogActions>
          </Dialog>
        }
        <Toolbar>
          <Button
            variant="raised"
            color="primary"
            disabled={buttonFinishedDisabled}
            style={{ marginLeft: 10 }}
          >
            Afficher les doc terminés
          </Button>
          <Button
            onClick={() => this.onModalClick({ name: 'Rejeter' })}
            variant="raised"
            color="primary"
            disabled={buttonsDisabled}
            style={{ marginLeft: 10 }}
          >
            Rejeter
          </Button>
          <Button
            onClick={() => this.onModalClick({ name: 'Valider' })}
            variant="raised"
            color="primary"
            disabled={buttonsDisabled}
            style={{ marginLeft: 10 }}
          >
            Valider
          </Button>
          <Button
            onClick={() => this.onModalClick({ name: 'Suspendre' })}
            variant="raised"
            color="primary"
            disabled={buttonsDisabled}
            style={{ marginLeft: 10 }}
          >
            Suspendre
          </Button>
          <Button
            onClick={() => this.onModalClick({ name: 'RAZ' })}
            variant="raised"
            color="primary"
            disabled={buttonsDisabled}
            style={{ marginLeft: 10 }}
          >
            RAZ
          </Button>
          <Button
            onClick={() => this.onModalClick({ name: 'Commenter' })}
            variant="raised"
            color="primary"
            disabled={buttonsDisabled}
            style={{ marginLeft: 10 }}
          >
            Commenter
          </Button>
        </Toolbar>
      </div>*/
    )
  }
}
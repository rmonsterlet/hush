import * as React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';

type LoggedProps = {
  onDisconnect: any
}
type LoggedState = {
  open: boolean,
  anchorEl?: any
}
export class Logged extends React.Component<LoggedProps, LoggedState> {

  props
  state

  constructor(props: LoggedProps) {
    super(props)

    this.state = {
      open: false,
      anchorEl: null
    }
  }

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  onLoginClick = (event) => {
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  onRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  onDisconnectClick = () => {
    this.props.onDisconnect()
  }

  render() {

    const { anchorEl } = this.state

    return (
      <div>

        <Button
          onClick={this.onLoginClick}
          variant="raised"
          color="primary"
          style={{ marginRight: 50 }}
        >
          <Icon className="material-icons">face</Icon>
          Aroua Bourkhris
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        >
          <MenuItem onClick={this.onMenuClose}>Mon profil</MenuItem>
          <MenuItem onClick={this.onMenuClose}>Mes préférences</MenuItem>
          <MenuItem onClick={this.onDisconnectClick}>Déconnexion</MenuItem>
        </Menu>

        <Button
          variant="raised"
          color="primary"
          style={{ marginRight: 10 }}
        >
          Accueil
        </Button>
        <Button 
          variant="raised"
          color="primary"
          style={{ marginRight: 10 }}
        >
          A propos
        </Button>
        <Button
          variant="raised"
          color="primary"
          style={{ marginRight: 10 }}
        >
          Aide
        </Button>
        <Button
          variant="raised"
          color="primary"
        >
          Contact
        </Button>
      </div>
    )
  }
}

type LoginProps = {
  onConnect: any
}
type LoginState = {
}
export class Login extends React.Component<LoginProps, LoginState> {

  props

  constructor(props: LoginProps) {
    super(props)
  }

  onConnectClick = () => {
    this.props.onConnect()
  }

  render() {
    return (
      <Button
        onClick={this.onConnectClick}
        variant="raised"
        color="primary"
      >
        <Icon className="material-icons">help_outline</Icon>
        Se connecter
      </Button>
    )
  }
}
import * as React from 'react';

import './App.css';
import CssBaseline from 'material-ui/CssBaseline';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import { Login, Logged } from './login/Login'
import { Panier } from './panier/Panier'
import { Documents } from './documents/Documents'

const logo = require('../assets/img/logo.png');

type AppProps = {
}
type AppState = {
  logged: boolean
  tab: number
}
class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props)

    this.state = {
      logged: true,
      tab: 0
    }
  }

  onConnect = () => {
    this.setState({ logged: true })
  }

  onDisconnect = () => {
    this.setState({ logged: false })
  }

  onTabChange = (event, tab) => {
    this.setState({ tab });
  }

  render() {
    const { logged, tab } = this.state

    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <AppBar position="static">
            <Toolbar>
              <img src={logo} className="app-logo" alt="logo" />
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                Casier Virtuel
              </Typography>
              {logged ? <Logged onDisconnect={this.onDisconnect} /> : <Login onConnect={this.onConnect} />}
            </Toolbar>
          </AppBar>
          <Paper>
            <Tabs 
              value={tab} 
              onChange={this.onTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered={true}
            >
              <Tab icon={<Icon className="material-icons">insert_drive_file</Icon>} label="Documents" />
              <Tab icon={<Icon className="material-icons">shopping_basket</Icon>} label="Panier" />
            </Tabs>
            {tab === 0 && <Documents />}
            {tab === 1 && <Panier />}
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}
export default App

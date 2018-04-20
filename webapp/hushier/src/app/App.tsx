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
import { Scores } from './scores/Scores'
import { Joueurs } from './joueurs/Joueurs'

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
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                La Carabistouille™
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
              <Tab icon={<Icon className="material-icons">tag_faces</Icon>} label="Joueurs" />
              <Tab icon={<Icon className="material-icons">stars</Icon>} label="Scores" />
            </Tabs>
            {tab === 0 && <Joueurs />}
            {tab === 1 && <Scores />}
          </Paper>
          <Typography variant="title" color="primary" style={{marginLeft: 10, marginTop: 20, flex: 1}}>
              La Carabistouille™ est en cours de développement. Wait for it :)
          </Typography>
        </div>
      </React.Fragment>
    )
  }
}
export default App

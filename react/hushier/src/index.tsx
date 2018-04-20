import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto'
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import orange from 'material-ui/colors/red';

import App from './app/App';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4e8ee3'
    },
    secondary: {
      main: orange[500]
    }
  }
})

const RootApp = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <RootApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

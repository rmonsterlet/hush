import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto'
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import * as colors from 'material-ui/colors';

import App from './app/App';
import './index.css';

const getRandomProperty = (obj) => {
  const keys = Object.keys(obj).filter(name => name !== 'common')
  return obj[keys[Math.floor(keys.length * Math.random())]]
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: getRandomProperty(colors)[500]
    },
    secondary: {
      main: getRandomProperty(colors)[500]
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

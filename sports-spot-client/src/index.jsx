/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore,applyMiddleware} from 'redux';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import routes from './routes.jsx';
import {setCurrentAllNews,setConnectionState} from './action_creators';
import reducer from './reducer';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import remoteActionMiddleware from './remote_action_middleware';
import io from 'socket.io-client';

injectTapEventPlugin();

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('curr_all_news', curr_all_news =>
  store.dispatch(setCurrentAllNews(curr_all_news))
);

[
  'connect',
 'connect_error',
 'connect_timeout',
 'reconnect',
 'reconnecting',
 'reconnect_error',
 'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
);


const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>
  </MuiThemeProvider>), 
        document.getElementById('root')
);

registerServiceWorker();
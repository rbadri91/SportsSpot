/*jshint esversion: 6 */
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore,applyMiddleware} from 'redux';
import { HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
import remoteActionMiddleware from './remote_action_middleware';
import routes,{subNavroutes} from './routes.jsx';
import {setCurrentNews,setConnectionState} from './action_creators';
import reducer from './reducer';
import MainNav from './components/navbar.jsx';
import SubNavigation from './components/SubNavigation.jsx';
const thunk = require('redux-thunk').default;
// import './index.css';
// import App from './App';

injectTapEventPlugin();

// const socket = io(`${location.protocol}//${location.hostname}:8090`);
var socket = io.connect('https://sportsspot.herokuapp.com', {secure: true});
// const socket = io.connect('http://localhost:8090');

socket.on('curr_news', curr_news =>
  store.dispatch(setCurrentNews(curr_news))
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


const store = createStore(
  reducer,
  applyMiddleware(thunk),
  applyMiddleware(remoteActionMiddleware(socket))
);

ReactDOM.render((
  <Provider store={store}>
    <Router><MainNav>{routes}</MainNav></Router>
</Provider>), 
        document.getElementById('mainNavbar')
);

ReactDOM.render((
  <Provider store={store}>
   <Router><SubNavigation>{subNavroutes}</SubNavigation></Router>
  </Provider>
), 
        document.getElementById('subNavbar')
);


ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>
  </MuiThemeProvider>), 
        document.getElementById('root')
);



registerServiceWorker();
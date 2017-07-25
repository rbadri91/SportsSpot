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
var NavBar = require('./components/navbar');
import registerServiceWorker from './registerServiceWorker';
import remoteActionMiddleware from './remote_action_middleware';
import io from 'socket.io-client';

injectTapEventPlugin();

const socket = io(`${location.protocol}//${location.hostname}:8090`);
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);


// ReactDOM.render( < App / > , document.getElementById('root'));
ReactDOM.render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router>{routes}</Router>
  </MuiThemeProvider>), 
        document.getElementById('root')
);

registerServiceWorker();
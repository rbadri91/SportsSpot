import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import {Route} from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import HomePage from './components/SportsHome.jsx';



// ReactDOM.render( < App / > , document.getElementById('root'));
ReactDOM.render(
        <HomePage />, 
        document.getElementById('root')
);
registerServiceWorker();
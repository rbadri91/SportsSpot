import MainNav from './components/navbar.jsx';
import {HomePageContainer} from './components/SportsHome.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch  } from 'react-router-dom';
import App from './components/App';

const routes =<MainNav>
    <App>
    <Switch>
        <Route exact path="/" component={HomePageContainer}/>
        <Route path ="/login" component = {LoginPage}/>
        <Route path ="/signup" component = {SignUpPage}/>
    </Switch> 
    </App>
</MainNav>;
export default routes;
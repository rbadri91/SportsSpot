import MainNav from './components/navbar.jsx';
import HomePage from './components/SportsHome.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch  } from 'react-router-dom';

const routes =<MainNav>
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path ="/login" component = {LoginPage}/>
        <Route path ="/signup" component = {SignUpPage}/>
    </Switch> 
</MainNav>;
export default routes;
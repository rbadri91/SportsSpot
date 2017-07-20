import Base from './components/Base.jsx';
import HomePage from './components/SportsHome.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch  } from 'react-router-dom';

const routes = <Base>
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path ="/login" component = {LoginPage}/>
        <Route path ="/signup" component = {SignUpPage}/>
    </Switch>    
</Base>;

// const routes = {
//     // base component (wrapper for the whole application).
//     component: Base,
//     childRoutes: [

//         {
//             path: '/',
//             component: HomePage
//         },

//         {
//             path: '/login',
//             component: LoginPage
//         },

//         {
//             path: '/signup',
//             component: SignUpPage
//         }

//     ]
// };
export default routes;
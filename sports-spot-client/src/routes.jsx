
import {HomePageContainer} from './components/SportsHome.jsx';
import {subHomePageContainer} from './components/SubSportsHomePage.jsx';
import {ScorePageContainer} from './components/Scores.jsx';
import {StatsPageContainer} from './components/Stats.jsx';
import {SchedulePageContainer} from './components/Schedule.jsx';
import {TeamsPageContainer} from './components/Teams.jsx';
import {StandingsPageContainer} from './components/Standings.jsx';

import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import MainNav from './components/navbar.jsx';
import SubNavigation from './components/SubNavigation.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch  } from 'react-router-dom';
import App from './components/App';

const routes =  <div>
                <Switch>
                    <Route  exact path="/" component={HomePageContainer}/>
                    <Route  path="/nfl" component={subHomePageContainer}/>
                    <Route  path="/nhl" component={subHomePageContainer}/>
                    <Route  path="/nba" component={subHomePageContainer}/>
                    <Route  path="/mlb" component={subHomePageContainer}/>
                    <Route  path ="/login" component = {LoginPage}/>
                    <Route  path ="/signup" component = {SignUpPage}/>
                </Switch>
                </div>

export const subNavroutes = <SubNavigation>
                    <Route  path="/scores" component={ScorePageContainer}/>
                    <Route  path="/schedules" component={SchedulePageContainer}/>
                    <Route  path="/standings" component={StandingsPageContainer}/>
                    <Route  path="/stats" component={StatsPageContainer}/>
                    <Route  path ="/teams" component = {TeamsPageContainer}/>
    </SubNavigation>          
export default routes;
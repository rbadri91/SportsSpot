import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch  } from 'react-router-dom';
import {HomePageContainer} from './components/SportsHome.jsx';
import {subHomePageContainer} from './components/SubSportsHomePage.jsx';
import {ScorePageContainer} from './components/Scores.jsx';
import {MLBStatsPageContainer} from './components/MLBStats.jsx';
import {NBAStatsPageContainer} from './components/NBAStats.jsx';
import {NFLStatsPageContainer} from './components/NFLStats.jsx';
import {NHLStatsPageContainer} from './components/NHLStats.jsx';
import {SchedulePageContainer} from './components/Schedule.jsx';
import {TeamsPageContainer} from './components/Teams.jsx';
import {StandingsPageContainer} from './components/Standings.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import RosterPanel from './components/RosterPanel.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import MainNav from './components/navbar.jsx';
import SubNavigation from './components/SubNavigation.jsx';
import App from './components/App';
import TeamsInfoWrapper from './components/TeamInfoWrapper';

const routes =  <div>
                <Switch>
                    <Route  exact path="/" component={HomePageContainer}/>
                    <Route exact path="/nfl" component={subHomePageContainer}/>
                    <Route exact path="/nhl" component={subHomePageContainer}/>
                    <Route exact path="/nba" component={subHomePageContainer}/>
                    <Route exact path="/mlb" component={subHomePageContainer}/>
                    <Route  path ="/login" component = {LoginPage}/>
                    <Route  path ="/signup" component = {SignUpPage}/>
                    <Route  path="/nba/home" component={subHomePageContainer}/>
                    <Route  path="/mlb/home" component={subHomePageContainer}/>
                    <Route  path="/nfl/home" component={subHomePageContainer}/>
                    <Route  path="/nhl/home" component={subHomePageContainer}/>
                    <Route  path="/nba/scores" component={ScorePageContainer}/>
                    <Route  path="/mlb/scores" component={ScorePageContainer}/>
                    <Route  path="/nfl/scores" component={ScorePageContainer}/>
                    <Route  path="/nhl/scores" component={ScorePageContainer}/>
                    <Route  path="/nba/schedules" component={SchedulePageContainer}/>
                    <Route  path="/mlb/schedules" component={SchedulePageContainer}/>
                    <Route  path="/nfl/schedules" component={SchedulePageContainer}/>
                    <Route  path="/nhl/schedules" component={SchedulePageContainer}/>
                    <Route  path="/nba/teams/schedules" component={TeamsInfoWrapper}/>
                    <Route  path="/mlb/teams/schedules" component={TeamsInfoWrapper}/>
                    <Route  path="/nfl/teams/schedules" component={TeamsInfoWrapper}/>
                    <Route  path="/nhl/teams/schedules" component={TeamsInfoWrapper}/>
                    <Route  path="/nba/teams/stats" component={TeamsInfoWrapper}/>
                    <Route  path="/mlb/teams/stats" component={TeamsInfoWrapper}/>
                    <Route  path="/nfl/teams/stats" component={TeamsInfoWrapper}/>
                    <Route  path="/nhl/teams/stats" component={TeamsInfoWrapper}/>
                    <Route  path="/nba/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/mlb/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/nfl/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/nhl/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/nba/standings" component={StandingsPageContainer}/>
                    <Route  path="/mlb/standings" component={StandingsPageContainer}/>
                    <Route  path="/nfl/standings" component={StandingsPageContainer}/>
                    <Route  path="/nhl/standings" component={StandingsPageContainer}/>
                    <Route  path="/nba/stats" component={NBAStatsPageContainer}/>
                    <Route  path="/mlb/stats" component={MLBStatsPageContainer}/>
                    <Route  path="/nfl/stats" component={NFLStatsPageContainer}/>
                    <Route  path="/nhl/stats" component={NHLStatsPageContainer}/>
                    <Route  path="/nba/teams" component={TeamsPageContainer}/>
                    <Route  path="/mlb/teams" component={TeamsPageContainer}/>
                    <Route  path="/nfl/teams" component={TeamsPageContainer}/>
                    <Route  path="/nhl/teams" component={TeamsPageContainer}/>
                    <Route  path="/nba/showStatPanel" component={StatsPanel}/>
                    <Route  path="/mlb/showStatPanel" component={StatsPanel}/>
                    <Route  path="/nfl/showStatPanel" component={StatsPanel}/>
                    <Route  path="/nhl/showStatPanel" component={StatsPanel}/>
                </Switch>
                </div>

export const subNavroutes = <div>
                <Switch>
                    <Route  path="/nba/scores" component={ScorePageContainer}/>
                    <Route  path="/mlb/scores" component={ScorePageContainer}/>
                    <Route  path="/nfl/scores" component={ScorePageContainer}/>
                    <Route  path="/nhl/scores" component={ScorePageContainer}/>
                    <Route  path="/schedules" component={SchedulePageContainer}/>
                    <Route  path="/standings" component={StandingsPageContainer}/>
                    <Route  path="/nba/standings" component={StandingsPageContainer}/>
                    <Route  path="/mlb/standings" component={StandingsPageContainer}/>
                    <Route  path="/nfl/standings" component={StandingsPageContainer}/>
                    <Route  path="/nhl/standings" component={StandingsPageContainer}/>
                    <Route  path="/nba/stats" component={NBAStatsPageContainer}/>
                    <Route  path="/mlb/stats" component={MLBStatsPageContainer}/>
                    <Route  path="/nfl/stats" component={NFLStatsPageContainer}/>
                    <Route  path="/nhl/stats" component={NHLStatsPageContainer}/>
                    <Route  path="/nba/showStatPanel" component={StatsPanel}/>
                    <Route  path="/mlb/showStatPanel" component={StatsPanel}/>
                    <Route  path="/nfl/showStatPanel" component={StatsPanel}/>
                    <Route  path="/nhl/showStatPanel" component={StatsPanel}/>
                    <Route  path="/nba/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/mlb/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/nfl/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/nhl/teams/roster" component={TeamsInfoWrapper}/>
                    <Route  path="/nba/teams/stats" component={TeamsInfoWrapper}/>
                    <Route  path="/mlb/teams/stats" component={TeamsInfoWrapper}/>
                    <Route  path="/nfl/teams/stats" component={TeamsInfoWrapper}/>
                    <Route  path="/nhl/teams/stats" component={TeamsInfoWrapper}/>
                     <Route  path="/nba/teams" component={TeamsPageContainer}/>
                    <Route  path="/mlb/teams" component={TeamsPageContainer}/>
                    <Route  path="/nfl/teams" component={TeamsPageContainer}/>
                    <Route  path="/nhl/teams" component={TeamsPageContainer}/>
                     <Route  path ="/home" component = {subHomePageContainer}/>
                </Switch>
    </div>          
export default routes;